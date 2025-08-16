import { comparePassword } from "@/utils/hashAuth";
import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "@/utils/jwtAuth";
import Student from "@/models/parents/studentsModel";
import { Request, Response } from "express";
import { parentLoginSchema } from "@/validations/parentValidation";

const loginParent = async (req: Request, res: Response): Promise<void> => {
  const loginInfo = req.body;
  const parsed = parentLoginSchema.safeParse(loginInfo);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const { parentEmail, password } = parsed.data;

    const student = await Student.findOne({ parentEmail });
    if (!student) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await comparePassword(password, student.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const tokenPayload = {
      role: "parent" as const,
      studentId: student._id.toString(),
      email: student.parentEmail,
      parentName: student.parentName,
    };

    // Generate tokens
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Set secure cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Send success response with parent data (NO TOKENS in response body for security)
    res.status(200).json({
      message: "Login successful",
      parent: {
        id: student._id,
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        studentName: student.name,
        instituteName: student.instituteName,
        parentPhone : student.parentPhone,
        class : student.grade,
        rollNo : student.rollNumber
            },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginParent };
