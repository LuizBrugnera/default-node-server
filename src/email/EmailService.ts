import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: any[];
}

export const EmailHelper = {
  sendMail: async (options: EmailOptions): Promise<boolean> => {
    console.log("Enviando Email");
    console.log(options.to);
    console.log(options.subject);
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: `"Document Viewer" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      const res = await transporter.sendMail(mailOptions);
      if (res.rejected.length > 0) {
        console.error("Email foi rejeitado:", res.rejected);
        return false;
      }
      console.log("Email sent successfully!");
      return true;
    } catch (error) {
      return false;
    }
  },
};
