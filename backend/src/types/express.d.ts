declare namespace Express {
  interface Request {
    institute?: any;
    parent?: any;
    user?: {
      role: "institute" | "parent";
      studentId?: string;
      instituteId?: string;
      email: string;
      instituteName: string;
    };
  }
}
