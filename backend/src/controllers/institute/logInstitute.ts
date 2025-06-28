import Institute from "@/models/institute/instituteModel";
import { Request, Response } from "express";
import { comparePassword } from "@/utils/institute/hashAuth";
import { instituteLoginSchema } from "@/validations/instituteValidation";
import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "@/utils/institute/jwtAuth";

export const logInstitute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = req.body;
    const parsed = instituteLoginSchema.safeParse(body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { contactEmail, password } = parsed.data;
    const institute = await Institute.findOne({ contactEmail });

    if (!institute) {
      res.status(400).json({ error: "Institute not found" });
      return;
    }

    const isPasswordValid = await comparePassword(password, institute.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    // Create token payload with institute information
    const tokenPayload = {
      instituteId: institute._id.toString(),
      email: institute.contactEmail,
      instituteName: institute.institute_name,
    };

    // Generate tokens
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set secure cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Send success response with institute data (NO TOKENS in response body for security)
    res.status(200).json({
      message: "Login successful",
      institute: {
        id: institute._id,
        name: institute.institute_name,
        email: institute.contactEmail,
        type: institute.institute_type,
        contactPerson: institute.contact_person,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
