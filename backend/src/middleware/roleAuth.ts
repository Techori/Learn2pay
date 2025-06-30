import { Request, Response, NextFunction } from "express";


// Middleware to check if user has specific role
export const requireRole = (allowedRoles: ("institute" | "parent")[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      });
      return;
    }

    next();
  };
};

// Specific role middlewares
export const requireInstituteRole = requireRole(["institute"]);
export const requireParentRole = requireRole(["parent"]);
export const requireAnyRole = requireRole(["institute", "parent"]);

// Middleware to check if institute can access specific student data
export const requireInstituteStudentAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || req.user.role !== "institute") {
    res.status(403).json({ message: "Institute access required" });
    return;
  }

  // Additional logic to verify institute owns the student can be added here
  next();
};

// Middleware to check if parent can access specific student data
export const requireParentStudentAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || req.user.role !== "parent") {
    res.status(403).json({ message: "Parent access required" });
    return;
  }

  const { studentId } = req.params;

  // Check if parent is accessing their own child's data
  if (req.user.studentId !== studentId) {
    res.status(403).json({
      message: "Access denied. You can only access your own child's data",
    });
    return;
  }

  next();
};
