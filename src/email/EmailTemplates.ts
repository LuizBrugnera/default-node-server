export class EmailTemplates {
  static passwordReset(code: string, userName: string) {
    return {
      subject: "Password Reset Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333;">Password Reset</h1>
          </div>
          <div style="padding: 30px;">
            <p>Hello ${userName},</p>
            <p>You requested a password reset. Use the code below to reset your password:</p>
            <div style="background: #007bff; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; border-radius: 5px;">
              ${code}
            </div>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
            <p>© 2024 Your App. All rights reserved.</p>
          </div>
        </div>
      `
    };
  }

  static welcome(userName: string) {
    return {
      subject: "Welcome to Our Platform!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #28a745; color: white; padding: 20px; text-align: center;">
            <h1>Welcome ${userName}!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Thank you for joining our platform!</p>
            <p>You can now:</p>
            <ul>
              <li>Upload and manage files</li>
              <li>Create support tickets</li>
              <li>Access your dashboard</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">Get Started</a>
            </div>
          </div>
        </div>
      `
    };
  }

  static supportTicketCreated(ticketId: string, subject: string) {
    return {
      subject: `Support Ticket Created - #${ticketId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #17a2b8; color: white; padding: 20px; text-align: center;">
            <h1>Support Ticket Created</h1>
          </div>
          <div style="padding: 30px;">
            <p>Your support ticket has been created successfully.</p>
            <p><strong>Ticket ID:</strong> #${ticketId}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p>Our team will respond within 24 hours.</p>
          </div>
        </div>
      `
    };
  }

  static supportTicketUpdated(ticketId: string, status: string) {
    return {
      subject: `Support Ticket Updated - #${ticketId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ffc107; color: #333; padding: 20px; text-align: center;">
            <h1>Ticket Status Updated</h1>
          </div>
          <div style="padding: 30px;">
            <p>Your support ticket #${ticketId} has been updated.</p>
            <p><strong>New Status:</strong> ${status.toUpperCase()}</p>
            <p>Check your account for more details.</p>
          </div>
        </div>
      `
    };
  }
}