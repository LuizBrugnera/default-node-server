interface UserAuth {
  id: number;
  email: string;
  role: string;
  enrollments: any;
  fullName: string;
  iat: number;
  exp: number;
}
declare namespace Express {
  interface Request {
    user?: UserAuth;
    uuidFile?: string;
    originalFilename?: string;
    documentUserId?: number;
  }
}
