import { Request, Response } from "express";
import Student from "@/models/parents/studentsModel";


// Get student fees information
export const getStudentFees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.parent) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Mock fees data - in real implementation, this would come from a fees model
    const feesData = {
      studentId: req.parent._id,
      studentName: req.parent.name,
      totalFees: 50000,
      paidAmount: 30000,
      pendingAmount: 20000,
      dueDate: "2025-07-30",
      installments: [
        {
          id: 1,
          amount: 10000,
          dueDate: "2025-01-30",
          status: "paid",
          paidDate: "2025-01-25",
        },
        {
          id: 2,
          amount: 10000,
          dueDate: "2025-02-28",
          status: "paid",
          paidDate: "2025-02-25",
        },
        {
          id: 3,
          amount: 10000,
          dueDate: "2025-03-31",
          status: "paid",
          paidDate: "2025-03-28",
        },
        {
          id: 4,
          amount: 10000,
          dueDate: "2025-04-30",
          status: "pending",
        },
        {
          id: 5,
          amount: 10000,
          dueDate: "2025-05-31",
          status: "pending",
        },
      ],
    };

    res.json(feesData);
  } catch (error) {
    console.error("Get student fees error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get student academic details
export const getStudentAcademics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.parent) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Mock academic data - in real implementation, this would come from academic models
    const academicData = {
      studentId: req.parent._id,
      studentName: req.parent.name,
      currentGrade: req.parent.grade,
      rollNumber: req.parent.rollNumber,
      academicYear: "2024-25",
      attendance: {
        totalDays: 180,
        presentDays: 165,
        percentage: 91.67,
      },
      subjects: [
        { name: "Mathematics", marks: 85, grade: "A" },
        { name: "Science", marks: 78, grade: "B+" },
        { name: "English", marks: 82, grade: "A-" },
        { name: "Social Studies", marks: 88, grade: "A" },
        { name: "Hindi", marks: 75, grade: "B+" },
      ],
      overallGrade: "A-",
      overallPercentage: 81.6,
    };

    res.json(academicData);
  } catch (error) {
    console.error("Get student academics error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update student profile (limited fields that parent can update)
export const updateStudentProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.parent) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { parentPhone, address } = req.body;

    // Validate input
    if (!parentPhone && !address) {
      res.status(400).json({ message: "No valid fields to update" });
      return;
    }

    const updateData: any = {};
    if (parentPhone) updateData.parentPhone = parentPhone;
    if (address) updateData.address = address;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.parent._id,
      updateData,
      { new: true, select: "-password" }
    );

    if (!updatedStudent) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({
      message: "Profile updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update student profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
