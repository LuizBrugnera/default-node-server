import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { UserStatus, OnlineStatus } from "../entities/UserStatus";
import { NotificationService } from "./NotificationService";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export class WebSocketService {
  private io: SocketIOServer;
  private userStatusRepo = AppDataSource.getRepository(UserStatus);
  private notificationService = new NotificationService();
  private typingUsers = new Map<string, Set<string>>();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "*",
        methods: ["GET", "POST"]
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    this.io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error("Authentication error"));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
        socket.userId = decoded.id;
        socket.userRole = decoded.role;
        next();
      } catch (err) {
        next(new Error("Authentication error"));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on("connection", async (socket: AuthenticatedSocket) => {
      console.log(`User ${socket.userId} connected`);

      // Update user status to online
      await this.updateUserStatus(socket.userId!, OnlineStatus.ONLINE, socket.id);

      // Join user to their personal room
      socket.join(`user_${socket.userId}`);

      // Handle support ticket room joining
      socket.on("join_ticket", (ticketId: string) => {
        socket.join(`ticket_${ticketId}`);
      });

      // Handle real-time messaging
      socket.on("send_message", async (data: {
        ticketId: string;
        message: string;
      }) => {
        // Broadcast message to ticket room
        socket.to(`ticket_${data.ticketId}`).emit("new_message", {
          ticketId: data.ticketId,
          message: data.message,
          senderId: socket.userId,
          timestamp: new Date(),
          isAdminMessage: socket.userRole === "admin"
        });
      });

      // Handle typing indicators
      socket.on("typing_start", (ticketId: string) => {
        if (!this.typingUsers.has(ticketId)) {
          this.typingUsers.set(ticketId, new Set());
        }
        this.typingUsers.get(ticketId)!.add(socket.userId!);
        
        socket.to(`ticket_${ticketId}`).emit("user_typing", {
          userId: socket.userId,
          ticketId
        });
      });

      socket.on("typing_stop", (ticketId: string) => {
        if (this.typingUsers.has(ticketId)) {
          this.typingUsers.get(ticketId)!.delete(socket.userId!);
        }
        
        socket.to(`ticket_${ticketId}`).emit("user_stopped_typing", {
          userId: socket.userId,
          ticketId
        });
      });

      // Handle disconnect
      socket.on("disconnect", async () => {
        console.log(`User ${socket.userId} disconnected`);
        await this.updateUserStatus(socket.userId!, OnlineStatus.OFFLINE);
        
        // Clean up typing indicators
        this.typingUsers.forEach((users, ticketId) => {
          if (users.has(socket.userId!)) {
            users.delete(socket.userId!);
            socket.to(`ticket_${ticketId}`).emit("user_stopped_typing", {
              userId: socket.userId,
              ticketId
            });
          }
        });
      });
    });
  }

  private async updateUserStatus(userId: string, status: OnlineStatus, socketId?: string) {
    let userStatus = await this.userStatusRepo.findOne({ where: { userId } });
    
    if (!userStatus) {
      userStatus = this.userStatusRepo.create({
        userId,
        status,
        socketId: socketId || null,
        lastSeen: status === OnlineStatus.OFFLINE ? new Date() : null
      });
    } else {
      userStatus.status = status;
      userStatus.socketId = socketId || null;
      userStatus.lastSeen = status === OnlineStatus.OFFLINE ? new Date() : null;
    }

    await this.userStatusRepo.save(userStatus);
  }

  // Send real-time notification
  async sendNotification(userId: string, notification: any) {
    this.io.to(`user_${userId}`).emit("notification", notification);
  }

  // Broadcast to all users
  broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }

  // Send to specific ticket room
  sendToTicket(ticketId: string, event: string, data: any) {
    this.io.to(`ticket_${ticketId}`).emit(event, data);
  }
}