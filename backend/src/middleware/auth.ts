import { Request, Response, NextFunction } from "express";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/utils/institute/jwtAuth";
import Institute from "@/models/institute/instituteModel";

// Extend Request interface to include institute data
declare global {
  namespace Express {
    interface Request {
      institute?: {
        id: string;
        email: string;
        instituteName: string;
      };
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // Check if access token exists and is valid
    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);
      if (decoded) {
        // Token is valid, attach institute data to request
        req.institute = {
          id: decoded.instituteId,
          email: decoded.email,
          instituteName: decoded.instituteName,
        };
        next();
        return;
      }
    }

    // Access token invalid/expired, try refresh token
    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      if (decoded) {
        // Verify institute still exists in database
        const institute = await Institute.findById(decoded.instituteId);
        if (!institute) {
          res.status(401).json({ error: "Institute not found" });
          return;
        }

        // Generate new access token
        const newAccessToken = generateAccessToken({
          instituteId: decoded.instituteId,
          email: decoded.email,
          instituteName: decoded.instituteName,
        });

        // Set new access token cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

        // Attach institute data to request
        req.institute = {
          id: decoded.instituteId,
          email: decoded.email,
          instituteName: decoded.instituteName,
        };

        next();
        return;
      }
    }

    // No valid tokens
    res.status(401).json({ error: "Authentication required" });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Optional: Middleware for routes that work with or without auth
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);
      if (decoded) {
        req.institute = {
          id: decoded.instituteId,
          email: decoded.email,
          instituteName: decoded.instituteName,
        };
      }
    }
    next(); // Continue regardless of auth status
  } catch (error) {
    next(); // Continue even if there's an error
  }
};
