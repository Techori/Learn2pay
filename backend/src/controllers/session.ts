/// <reference path="../types/express.d.ts" />
import { Request, Response } from "express";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "@/utils/jwtAuth";
import Institute from "@/models/institute/instituteModel";
import Student from "@/models/parents/studentsModel";

// Get current session info
export const getSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Session check - User role:", req.user?.role);

    if (req.user?.role === "institute") {
      if (!req.institute) {
        console.log("Institute data not found for user:", req.user);
        res.status(401).json({ message: "Institute data not found" });
        return;
      }

      console.log("Institute session active for:", req.institute.instituteName);
      console.log(
        "Full institute object:",
        JSON.stringify(req.institute, null, 2)
      );
      res.json({
        institute: {
          id: req.institute._id,
          name: req.institute.instituteName,
          email: req.institute.contactEmail,
          type: req.institute.instituteType,
          contactPerson: req.institute.contactPerson || {
            firstName: "",
            lastName: "",
          },
        },
        message: "Institute session active",
      });
      return;
    }

    if (req.user?.role === "parent") {
      if (!req.parent) {
        console.log("Parent data not found for user:", req.user);
        res.status(401).json({ message: "Parent data not found" });
        return;
      }

      console.log("Parent session active for:", req.parent.parentName);
      res.json({
        parent: {
          id: req.parent._id,
          parentName: req.parent.parentName,
          parentEmail: req.parent.parentEmail,
          studentName: req.parent.name,
          instituteName: req.parent.instituteName,
        },
        message: "Parent session active",
      });
      return;
    }

    console.log("Invalid session - no valid role found");
    res.status(401).json({ message: "Invalid session" });
  } catch (error) {
    console.error("Session error:", error);
    res.status(500).json({ message: "Session error" });
  }
};

// Refresh access token
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token not provided" });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }

    let tokenPayload;

    if (decoded.role === "institute") {
      // Verify institute still exists
      const institute = await Institute.findById(decoded.instituteId);
      if (!institute) {
        res.status(401).json({ error: "Institute not found" });
        return;
      }

      tokenPayload = {
        role: "institute" as const,
        instituteId: decoded.instituteId,
        email: decoded.email,
        instituteName: decoded.instituteName,
      };
    } else if (decoded.role === "parent") {
      // Verify student still exists
      const student = await Student.findById(decoded.studentId);
      if (!student) {
        res.status(401).json({ error: "Student not found" });
        return;
      }

      tokenPayload = {
        role: "parent" as const,
        studentId: decoded.studentId,
        email: decoded.email,
        instituteName: decoded.instituteName,
      };
    } else {
      res.status(401).json({ error: "Invalid role in token" });
      return;
    }

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    // Set new cookies
    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({ message: "Tokens refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Determine cookie settings based on environment (must match setTokenCookies)
    const isProduction = process.env.NODE_ENV === "production";
    
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ("none" as const) : ("lax" as const),
      // domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
    };

    // Clear cookies with the same options used to set them
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
