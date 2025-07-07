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
      res.status(400).json({ error: parsed.error.flatten() });
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
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
