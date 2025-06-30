/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwtAuth";
import Institute from "@/models/institute/instituteModel";
import Student from "@/models/parents/studentsModel";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authentication token required" });
      return;
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (decoded.role === "institute") {
      const institute = await Institute.findById(decoded.instituteId).select(
        "-password"
      );
      if (!institute) {
        res.status(401).json({ message: "Institute not found" });
        return;
      }
      req.institute = institute;
    } else if (decoded.role === "parent") {
      const student = await Student.findById(decoded.studentId).select(
        "-password"
      );
      if (!student) {
        res.status(401).json({ message: "Parent/Student not found" });
        return;
      }
      req.parent = student;
    } else {
      res.status(401).json({ message: "Invalid role" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { authenticateToken };

export default authenticateToken;
