import { hashPassword } from "@/utils/hashAuth";
import Student from "@/models/parents/studentsModel";
import { Request, Response } from "express";
import {
  studentRegisterSchema,
  bulkStudentSchema,
} from "@/validations/parentValidation";
import { validateExcelFormat } from "@/utils/excelTemplate";
import XLSX from "xlsx";
import multer from "multer";
import path from "path";

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".xlsx", ".xls"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Accept any field name for flexibility (Postman testing, etc.)
const uploadMiddleware = upload.any();

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

// Helper function to parse Excel data
const parseExcelData = (buffer: Buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData.map((row: any) => ({
    name: row["Student Name"] || row["name"],
    parentName: row["Parent Name"] || row["parentName"],
    parentEmail: row["Parent Email"] || row["parentEmail"],
    parentPhone: row["Parent Phone"] || row["parentPhone"],
    password: row["Password"] || row["password"],
    dateOfBirth:
      row["Date of Birth"] ||
      row["Date of Birth (YYYY-MM-DD)"] ||
      row["dateOfBirth"],
    age: parseInt(row["Age"] || row["age"]) || 0,
    grade: row["Grade"] || row["grade"],
    rollNumber: row["Roll Number"] || row["rollNumber"],
    address: {
      completeAddress: row["Complete Address"] || row["address"],
      city: row["City"] || row["city"],
      state: row["State"] || row["state"],
      pinCode: row["PIN Code"] || row["pinCode"],
    },
    instituteName: row["Institute Name"] || row["instituteName"],
  }));
};

// Bulk registration function
const bulkRegisterStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Handle files array from upload.any()
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: "No Excel file uploaded" });
      return;
    }

    // Get the first uploaded file
    const file = files[0];

    // Check file type
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (![".xlsx", ".xls"].includes(fileExt)) {
      res
        .status(400)
        .json({ message: "Only Excel files (.xlsx, .xls) are allowed" });
      return;
    }

    // Validate Excel format first
    const formatValidation = validateExcelFormat(file.buffer);
    if (!formatValidation.isValid) {
      res.status(400).json({
        message: "Invalid Excel format",
        errors: formatValidation.errors,
      });
      return;
    }

    // Parse Excel data
    const studentsData = parseExcelData(file.buffer);

    // Validate all student data
    const parsed = bulkStudentSchema.safeParse(studentsData);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation error in Excel data",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const validatedStudents = parsed.data;

    // Check for duplicates within the uploaded data
    const rollNumbers = validatedStudents.map((s) => s.rollNumber);
    const duplicateRolls = rollNumbers.filter(
      (roll, index) => rollNumbers.indexOf(roll) !== index
    );

    if (duplicateRolls.length > 0) {
      res.status(400).json({
        message: "Duplicate roll numbers found in uploaded data",
        duplicates: duplicateRolls,
      });
      return;
    }

    // Check for existing students in database
    const existingStudents = await Student.find({
      $or: [
        { rollNumber: { $in: rollNumbers } },
        ...validatedStudents.map((student) => ({
          parentEmail: student.parentEmail,
          name: student.name,
          instituteName: student.instituteName,
        })),
      ],
    });

    if (existingStudents.length > 0) {
      const conflicts = existingStudents.map((student) => ({
        name: student.name,
        rollNumber: student.rollNumber,
        parentEmail: student.parentEmail,
        instituteName: student.instituteName,
      }));

      res.status(400).json({
        message: "Some students already exist in the database",
        conflicts,
      });
      return;
    }

    // Hash passwords for all students
    const studentsWithHashedPasswords = await Promise.all(
      validatedStudents.map(async (student) => ({
        ...student,
        password: await hashPassword(student.password),
        dateOfBirth: new Date(student.dateOfBirth),
      }))
    );

    // Bulk insert using MongoDB's insertMany for better performance
    const result = await Student.insertMany(studentsWithHashedPasswords, {
      ordered: false, // Continue inserting even if some fail
    });

    res.status(201).json({
      message: "Bulk registration completed successfully",
      totalStudents: validatedStudents.length,
      successfulRegistrations: result.length,
      students: result.map((student) => ({
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        grade: student.grade,
        instituteName: student.instituteName,
      })),
    });
  } catch (error) {
    console.error("Bulk registration error:", error);
    res.status(500).json({
      message: "Internal server error during bulk registration",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { registerStudent, bulkRegisterStudents, uploadMiddleware };
