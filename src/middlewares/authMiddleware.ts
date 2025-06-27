import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("Acesso negado.");
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY as string);
    const { id, email, iat, exp, role, enrollments, fullName } = verified as {
      id: string;
      email: string;
      fullName: string;
      iat: number;
      exp: number;
      role: string;
      enrollments: any;
    };
    req.user = {
      id: +id,
      email,
      iat: +iat,
      exp: +exp,
      role,
      enrollments,
      fullName,
    };
    next();
  } catch (error) {
    res.status(400).send("Token inválido.");
  }
};
