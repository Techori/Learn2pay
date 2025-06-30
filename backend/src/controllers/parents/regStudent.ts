import { hashPassword } from "@/utils/hashAuth";
import Student from "@/models/parents/studentsModel";
import { Request, Response } from "express";
import { studentRegisterSchema } from "@/validations/parentValidation";

const registerStudent = async (req: Request, res: Response): Promise<void> => {
  const studentInfo = req.body;
  const parsed = studentRegisterSchema.safeParse(studentInfo);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const {
      name,
      parentName,
      parentEmail,
      parentPhone,
      password,
      dateOfBirth,
      age,
      grade,
      rollNumber,
      address,
      instituteName,
    } = parsed.data;
    const existingStudent = await Student.findOne({
      parentEmail,
      name,
      instituteName,
      rollNumber,
    });
    if (existingStudent) {
      res.status(400).json({
        message:
          "Student with this parent email and student name already exists in this institute",
      });
      return;
    } else {
      const hashedPassword = await hashPassword(password);
      const newStudent = await Student.create({
        name,
        parentName,
        parentEmail,
        parentPhone,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        age,
        grade,
        rollNumber,
        address,
        instituteName,
      });
      res.status(201).json({
        message: "Student registered successfully",
        student: {
          id: newStudent._id,
          name: newStudent.name,
          rollNumber: newStudent.rollNumber,
          grade: newStudent.grade,
          instituteName: newStudent.instituteName,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerStudent };
