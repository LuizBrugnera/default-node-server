# Node.js API Boilerplate

A comprehensive Node.js API boilerplate with TypeScript, featuring all the essential components needed for modern web applications and mobile apps.

## 🚀 Features

### Core Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **User Management** - Complete user CRUD with profile management
- **File Management** - Upload, download, and manage files (documents, images, videos)
- **Support System** - Ticket-based support with real-time messaging
- **Email Service** - Password reset and notification system
- **Role-Based Permissions** - Admin and user roles with middleware protection

### Technical Stack

- **Node.js** with **TypeScript**
- **Express.js** framework
- **TypeORM** with MySQL/MariaDB
- **JWT** authentication
- **Multer** for file uploads
- **Nodemailer** for email services
- **bcrypt** for password hashing

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── entities/        # Database models
├── routes/          # API endpoints
├── middlewares/     # Custom middleware
├── migrations/      # Database migrations
├── seeds/           # Database seeders
├── email/           # Email templates & service
├── cache/           # Caching utilities
└── tests/           # Test files
```

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd back-end
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
```

4. **Configure environment variables**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
SECRET_KEY=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

5. **Run migrations**

```bash
npm run migration:run
```

6. **Seed database**

```bash
npm run seed
```

7. **Start the server**

```bash
npm run dev
```

## 📚 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/generate-code` - Generate password reset code
- `POST /api/v1/auth/verify-code` - Verify reset code
- `POST /api/v1/auth/reset-password` - Reset password
- `POST /api/v1/auth/update-password` - Update password (authenticated)

### User Management

- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/update` - Update user profile

### File Management

- `POST /api/v1/files/upload` - Upload file
- `GET /api/v1/files/:id/download` - Download file
- `DELETE /api/v1/files/:id` - Delete file

### Photo Management

- `POST /api/v1/photos/upload` - Upload photo
- `GET /api/v1/photos/:id` - Get photo
- `DELETE /api/v1/photos/:id` - Delete photo

### Video Management

- `POST /api/v1/videos/upload` - Upload video
- `GET /api/v1/videos/:id` - Get video
- `DELETE /api/v1/videos/:id` - Delete video

### Support System

- `POST /api/v1/support/tickets` - Create support ticket
- `GET /api/v1/support/my-tickets` - Get user's tickets
- `GET /api/v1/support/tickets` - Get all tickets (admin only)
- `GET /api/v1/support/tickets/:id` - Get specific ticket
- `PUT /api/v1/support/tickets/:id` - Update ticket (admin only)
- `DELETE /api/v1/support/tickets/:id` - Delete ticket (admin only)

### Support Messages

- `GET /api/v1/support/tickets/:ticketId/messages` - Get ticket messages
- `POST /api/v1/support/tickets/:ticketId/messages` - Send message
- `PUT /api/v1/support/messages/:id` - Edit message
- `DELETE /api/v1/support/messages/:id` - Delete message

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

- **Admin**: Full access to all endpoints
- **Student**: Limited access to user-specific endpoints

## 🧪 Testing

Use the included `index.html` file to test all API endpoints through a web interface:

1. Start the server
2. Open `index.html` in your browser
3. Test authentication and all endpoints

## 📝 Database Schema

### Core Entities

- **Users** - User accounts with roles
- **Roles** - User permission levels
- **Files** - File metadata and storage
- **Photos** - Image file management
- **Videos** - Video file management
- **SupportTickets** - Support ticket system
- **SupportMessages** - Ticket messaging system

## 🚀 Deployment

1. **Build the project**

```bash
npm run build
```

2. **Start production server**

```bash
npm start
```

## 🤝 Contributing

This boilerplate is designed to be a starting point for any API project. Feel free to:

- Add new features
- Modify existing functionality
- Extend the database schema
- Customize authentication logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Use Cases

Perfect foundation for:

- **E-commerce APIs**
- **Social media platforms**
- **Content management systems**
- **SaaS applications**
- **Mobile app backends**
- **Learning management systems**

---

**Ready to build your next API?** This boilerplate provides everything you need to get started quickly and scale efficiently.
