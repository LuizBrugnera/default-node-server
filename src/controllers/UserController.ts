import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service = new UserService();

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const data = await this.service.findById(user.id);
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const result = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        cpfOrCnpj: data.cpfOrCnpj,
        phoneNumber: data.phoneNumber,
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findById(req.params.id);
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const user = await this.service.findById(userId);

      const data = {
        fullName: req.body.fullName || user.fullName,
        cpfOrCnpj: req.body.cpfOrCnpj || user.cpfOrCnpj,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
      };
      await this.service.update(userId, data);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.remove(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
