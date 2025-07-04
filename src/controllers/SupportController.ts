import { Request, Response, NextFunction } from "express";
import { SupportService } from "../services/SupportService";

export class SupportController {
  private service = new SupportService();

  createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { subject, description, priority } = req.body;
      const ticket = await this.service.createTicket({
        userId: req.user.id.toString(),
        subject,
        description,
        priority,
      });
      res.status(201).json(ticket);
    } catch (err) {
      next(err);
    }
  };

  getMyTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tickets = await this.service.findTicketsByUser(
        req.user.id.toString()
      );
      res.json(tickets);
    } catch (err) {
      next(err);
    }
  };

  getAllTickets = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tickets = await this.service.findAllTickets();
      res.json(tickets);
    } catch (err) {
      next(err);
    }
  };

  getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticket = await this.service.findTicketById(req.params.id);
      if (!ticket) {
        res.status(404).json({ message: "Ticket não encontrado" });
        return;
      }

      if (
        req.user.role !== "admin" &&
        ticket.userId !== req.user.id.toString()
      ) {
        res.status(403).json({ message: "Acesso negado" });
        return;
      }

      res.json(ticket);
    } catch (err) {
      next(err);
    }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, assignedAdminId, priority } = req.body;
      await this.service.updateTicket(req.params.id, {
        status,
        assignedAdminId,
        priority,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteTicket(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  addMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = req.body;
      const ticket = await this.service.findTicketById(req.params.id);

      if (!ticket) {
        res.status(404).json({ message: "Ticket não encontrado" });
        return;
      }

      if (
        req.user.role !== "admin" &&
        ticket.userId !== req.user.id.toString()
      ) {
        res.status(403).json({ message: "Acesso negado" });
        return;
      }

      const newMessage = await this.service.addMessage({
        ticketId: req.params.id,
        senderId: req.user.id.toString(),
        message,
        isAdminMessage: req.user.role === "admin",
      });

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  };
}
