import { Request, Response } from "express";
import Student from "@/models/parents/studentsModel";
import Institute from "@/models/institute/instituteModel";

// Get all students for an institute
export const getInstituteStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.institute) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const students = await Student.find({
      instituteName: req.institute.instituteName,
    }).select("-password");

    res.json({
      message: "Students retrieved successfully",
      students: students.map((student) => ({
        id: student._id,
        name: student.name,
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        grade: student.grade,
        rollNumber: student.rollNumber,
        dateOfBirth: student.dateOfBirth,
        age: student.age,
        address: student.address,
      })),
      total: students.length,
    });
  } catch (error) {
    console.error("Get institute students error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get specific student details
export const getStudentDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.institute) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { studentId } = req.params;

    const student = await Student.findOne({
      _id: studentId,
      instituteName: req.institute.instituteName,
    }).select("-password");

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({
      message: "Student details retrieved successfully",
      student: {
        id: student._id,
        name: student.name,
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        grade: student.grade,
        rollNumber: student.rollNumber,
        dateOfBirth: student.dateOfBirth,
        age: student.age,
        address: student.address,
        instituteName: student.instituteName,
      },
    });
  } catch (error) {
    console.error("Get student details error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update student information (institute can update limited fields)
export const updateStudentInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.institute) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { studentId } = req.params;
    const { grade, rollNumber } = req.body;

    // Validate input
    if (!grade && !rollNumber) {
      res.status(400).json({ message: "No valid fields to update" });
      return;
    }

    const updateData: any = {};
    if (grade) updateData.grade = grade;
    if (rollNumber) updateData.rollNumber = rollNumber;

    const student = await Student.findOneAndUpdate(
      {
        _id: studentId,
        instituteName: req.institute.instituteName,
      },
      updateData,
      { new: true, select: "-password" }
    );

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({
      message: "Student information updated successfully",
      student: {
        id: student._id,
        name: student.name,
        grade: student.grade,
        rollNumber: student.rollNumber,
      },
    });
  } catch (error) {
    console.error("Update student info error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get institute statistics
export const getInstituteStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.institute) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const totalStudents = await Student.countDocuments({
      instituteName: req.institute.instituteName,
    });

    // Get students by grade
    const studentsByGrade = await Student.aggregate([
      { $match: { instituteName: req.institute.instituteName } },
      { $group: { _id: "$grade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      message: "Institute statistics retrieved successfully",
      stats: {
        totalStudents,
        studentsByGrade: studentsByGrade.map((item) => ({
          grade: item._id,
          count: item.count,
        })),
        institute: {
          name: req.institute.instituteName,
          type: req.institute.instituteType,
          email: req.institute.contactEmail,
        },
      },
    });
  } catch (error) {
    console.error("Get institute stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllInstitutes = async (req: Request, res: Response) : Promise<void> => {
    try {
        const institutes = await Institute.find({});
        console.log(institutes);
        res.json({
          message: "Institute details retrieved successfully",
          data : institutes.map((institute) => ({
            name : institute.instituteName,
            contactPerson : institute.contactPerson,
            contactEmail : institute.contactEmail,
            contactPhone : institute.contactPhone,
            instituteType : institute.instituteType,
            kycStatus : institute.kycStatus
          }))
        }).status(200);
    } catch (error : any) {
        console.error(error);
        res.json({
          message: "Internal server error",
          error : error
        }).status(500);
    }
};
