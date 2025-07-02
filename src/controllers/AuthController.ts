import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { RoleService } from "../services/RoleService";
import { resetCodes, resetTokens } from "../cache/resetPasswordCaches";
import { EmailHelper } from "../email/EmailService";
import { resetCodeMailOptions } from "../email/EmailData";

export class AuthController {
  private userService = new UserService();
  private authService = new AuthService();
  private roleService = new RoleService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const isMatch = await this.authService.verifyPassword(
        password,
        user.passwordHash
      );
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const token = await this.authService.generateToken({
        id: user.id,
        fullName: user.fullName,
        role: user.role.name,
        email: user.email,
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, email, password, cpfOrCnpj, phoneNumber } = req.body;
      const hashedPassword = await this.authService.hashPassword(password);
      const role = await this.roleService.findByName("basic");
      const user = await this.userService.create({
        role,
        fullName,
        email,
        passwordHash: hashedPassword,
        cpfOrCnpj,
        phoneNumber,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  generateCode = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    const userExists = await this.userService.findUserByEmail(email);

    if (!userExists) {
      res.status(400).send("Email não cadastrado.");
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    resetCodes.set(email, { code, expiresAt });

    try {
      await EmailHelper.sendMail({
        to: email,
        subject: "Password Reset Code",
        text: resetCodeMailOptions.text(code),
        html: resetCodeMailOptions.html(code),
      });

      res
        .status(200)
        .json({ message: "If the email exists, a reset code has been sent." });
    } catch (error) {
      res.status(500).json({ error: "Failed to send reset code." });
    }
  };

  verifyCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, code } = req.body;

      const resetCode = resetCodes.get(email);
      if (!resetCode || resetCode.code !== code) {
        res.status(400).send("Invalid reset code.");
        return;
      }

      const now = new Date();
      if (now > resetCode.expiresAt) {
        res.status(400).send("Reset code has expired.");
        return;
      }

      const token = this.authService.generateEmailToken(email, code);

      resetTokens.set(token, {
        email,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      resetCodes.delete(email);

      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send("Erro ao enviar código de redefinição.");
      return;
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, password } = req.body;

      const resetToken = resetTokens.get(token);
      if (!resetToken) {
        res.status(400).send("Invalid reset token.");
        return;
      }

      const now = new Date();
      if (now > resetToken.expiresAt) {
        res.status(400).send("Reset token has expired.");
        return;
      }

      const hashedPassword = await this.authService.hashPassword(password);

      const user = await this.userService.findUserByEmail(resetToken.email);

      if (user) {
        await this.userService.updatePasswordByEmail(
          resetToken.email,
          hashedPassword
        );

        resetTokens.delete(token);
        res.status(200).send("Password reset successfully.");
        return;
      } else resetTokens.delete(token);

      res.status(400).send("Invalid email.");
      return;
    } catch (error) {
      res.status(500).send("Erro ao redefinir senha.");
      return;
    }
  };

  updatePasswordWithPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!req.user) {
        res.status(400).send("User not found.");
        return;
      }

      const { id, role } = req.user;

      const userExists = await this.userService.findById(id);

      const validPassword = await this.authService.verifyPassword(
        oldPassword,
        userExists.passwordHash
      );
      if (!validPassword) {
        res.status(400).send("Invalid old password.");
        return;
      }

      const hashedPassword = await this.authService.hashPassword(newPassword);

      await this.userService.updatePasswordByEmail(
        userExists.email,
        hashedPassword
      );

      res.status(200).send("Password updated successfully.");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao atualizar senha.");
      return;
    }
  };
}

export default AuthController;
