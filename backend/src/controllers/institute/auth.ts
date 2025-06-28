import { Request, Response } from "express";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "@/utils/institute/jwtAuth";
import Institute from "@/models/institute/instituteModel";

// Get current session info
export const getSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.institute) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    // Fetch fresh institute data from database
    const institute = await Institute.findById(req.institute.id).select(
      "-password"
    );

    if (!institute) {
      res.status(404).json({ error: "Institute not found" });
      return;
    }

    res.status(200).json({
      institute: {
        id: institute._id,
        name: institute.institute_name,
        email: institute.contactEmail,
        type: institute.institute_type,
        contactPerson: institute.contact_person,
        address: institute.address,
      },
    });
  } catch (error) {
    console.error("Get session error:", error);
    res.status(500).json({ error: "Internal server error" });
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

    // Verify institute still exists
    const institute = await Institute.findById(decoded.instituteId);
    if (!institute) {
      res.status(401).json({ error: "Institute not found" });
      return;
    }

    // Generate new tokens
    const tokenPayload = {
      instituteId: decoded.instituteId,
      email: decoded.email,
      instituteName: decoded.instituteName,
    };

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
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
