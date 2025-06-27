import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async generateToken(payload: any): Promise<string> {
    return jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: "1y",
    });
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateEmailToken(email: string, code: string): string {
    return bcrypt.hashSync(email + code, 10);
  }
}
