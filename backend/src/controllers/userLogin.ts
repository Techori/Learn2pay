import { comparePassword } from "@/utils/hashAuth";
import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "@/utils/jwtAuth";
import User from "@/models/usersModel";
import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      res.status(400).json({ error: "Email, password, and role are required" });
      return;
    }

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      res.status(401).json({ error: "Invalid email, password, or role" });
      return;
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email, password, or role" });
      return;
    }

    // Create token payload
    const tokenPayload = {
      role: user.role as any,
      userId: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    };

    // Generate tokens
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set secure cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Send success response with user data (NO TOKENS in response body for security)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { loginUser }; 