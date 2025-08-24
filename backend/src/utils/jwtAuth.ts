import jwt from "jsonwebtoken";
import { Response } from "express";

interface TokenPayload {
  role: "institute" | "parent" | "sales_person" | "sales_manager" | "admin";
  studentId?: string;
  instituteId?: string;
  userId?: string;
  id?: string;
  email: string;
  instituteName?: string;
  parentName?: string;
  fullName?: string;
}

// access token generator
export const generateAccessToken = (payload: TokenPayload): string => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables"
    );
  }

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: 15 * 60, // 15 minutes in seconds
  });
};

// refresh token generator
export const generateRefreshToken = (payload: TokenPayload): string => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables"
    );
  }

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  });
};

// access token verificaton
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT_ACCESS_SECRET is not defined");
    }
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

// refresh token verification
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
    }
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

// Set secure HTTP-only cookies for tokens
export const setTokenCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  // Determine cookie settings based on environment
  const isProduction = process.env.NODE_ENV === "production";
  
  // Log environment for debugging
  console.log("Setting cookies with NODE_ENV:", process.env.NODE_ENV);
  console.log("Is production:", isProduction);
  
  // Cookie settings for production vs development
  const cookieOptions = {
    httpOnly: true, // Prevents XSS attacks
    secure: isProduction, // HTTPS in production only
    sameSite: isProduction ? ("none" as const) : ("lax" as const), // Allow cross-site in production
    // Add domain for production if your backend and frontend are on different subdomains
    // domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
  };

  console.log("Cookie options:", cookieOptions);

  // Access token - shorter expiry, sent with every request
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds for cookie
  });

  // Refresh token - longer expiry, used to get new access tokens
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds for cookie
  });
};
