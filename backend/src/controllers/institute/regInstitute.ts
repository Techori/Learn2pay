import { Request, Response } from "express";
import { instituteRegisterSchema } from "@/validations/instituteValidation";
import Institute from "@/models/institute/instituteModel";
import { hashPassword } from "@/utils/hashAuth";

export const registerInstitute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = instituteRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      // Extract and format validation errors
      const validationErrors = parsed.error.errors.map((err) => {
        if (err.path.length > 0) {
          const fieldPath = err.path.join(".");
          return `${fieldPath}: ${err.message}`;
        }
        return err.message;
      });

      res.status(400).json({
        error: "Validation failed",
        message: validationErrors.join(", "),
        details: validationErrors,
      });
      return;
    }

    const {
      instituteName,
      instituteType,
      description,
      contactPerson,
      contactEmail,
      contactPhone,
      address,
      password,
      documents,
    } = parsed.data;

    const exists = await Institute.findOne({ contactEmail, instituteName });
    if (exists) {
      res
        .status(400)
        .json({ message: "Either Institute or contactEmail already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newInstitute = await Institute.create({
      instituteName: instituteName,
      instituteType: instituteType,
      description,
      contactPerson: contactPerson,
      contactEmail,
      contactPhone,
      address,
      password: hashedPassword,
      documents,
    });

    res.status(201).json({
      message: "Institute registered successfully",
      id: newInstitute._id,
    });
  } catch (error: any) {
    console.error("Register Error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => {
        if (err.kind === "enum") {
          return `${err.path}: '${
            err.value
          }' is not a valid option. Valid options are: ${err.properties.enumValues.join(
            ", "
          )}`;
        }
        return `${err.path}: ${err.message}`;
      });

      res.status(400).json({
        error: "Validation failed",
        message: validationErrors.join(", "),
        details: validationErrors,
      });
      return;
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({
        error: "Duplicate entry",
        message: `${field} already exists. Please use a different ${field}.`,
      });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
