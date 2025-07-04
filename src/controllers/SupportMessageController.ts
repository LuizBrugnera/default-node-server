import { Request, Response, NextFunction } from "express";
import { SupportMessageService } from "../services/SupportMessageService";
import { SupportService } from "../services/SupportService";

export class SupportMessageController {
  private messageService = new SupportMessageService();
  private supportService = new SupportService();

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticketId } = req.params;
      const ticket = await this.supportService.findTicketById(ticketId);

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

      const messages = await this.messageService.findByTicketId(ticketId);
      res.json(messages);
    } catch (err) {
      next(err);
    }
  };

  createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticketId } = req.params;
      const { message } = req.body;

      const ticket = await this.supportService.findTicketById(ticketId);
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

      const newMessage = await this.messageService.create({
        ticketId,
        senderId: req.user.id.toString(),
        message,
        isAdminMessage: req.user.role === "admin",
      });

      const messageWithSender = await this.messageService.findById(
        newMessage.id
      );
      res.status(201).json(messageWithSender);
    } catch (err) {
      next(err);
    }
  };

  updateMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message } = req.body;

      const existingMessage = await this.messageService.findById(id);
      if (!existingMessage) {
        res.status(404).json({ message: "Mensagem não encontrada" });
        return;
      }

      if (existingMessage.senderId !== req.user.id.toString()) {
        res
          .status(403)
          .json({ message: "Só pode editar suas próprias mensagens" });
        return;
      }

      await this.messageService.update(id, { message });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const existingMessage = await this.messageService.findById(id);
      if (!existingMessage) {
        res.status(404).json({ message: "Mensagem não encontrada" });
        return;
      }

      if (
        req.user.role !== "admin" &&
        existingMessage.senderId !== req.user.id.toString()
      ) {
        res.status(403).json({ message: "Acesso negado" });
        return;
      }

      await this.messageService.delete(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}
