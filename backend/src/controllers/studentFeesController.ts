import { Request, Response } from "express";
import StudentFee from "../models/studentFeesModel";
import FeeStructure from "../models/feeStructureModel";

// Get all student fees for the authenticated institute
export const getAllStudentFees = async (req: Request, res: Response): Promise<void> => {
  try {
    // Filter by authenticated institute
    let query: any = {};
    
    if (req.institute && req.institute._id) {
      query.instituteId = req.institute._id;
    } else if (req.query.instituteId) {
      query.instituteId = req.query.instituteId;
    }

    // Additional filters from query params
    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }
    if (req.query.class) {
      query.class = req.query.class;
    }
    if (req.query.academicYear) {
      query.academicYear = req.query.academicYear;
    }
    
    const studentFees = await StudentFee.find(query)
      .populate('feeStructureId', 'class tuitionFee admissionFee examFee totalFee')
      .sort({ studentName: 1 });
    
    res.status(200).json({
      success: true,
      count: studentFees.length,
      data: studentFees
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get student fee by ID
export const getStudentFeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentFee = await StudentFee.findById(req.params.id)
      .populate('feeStructureId', 'class tuitionFee admissionFee examFee totalFee');
    
    if (!studentFee) {
      res.status(404).json({
        success: false,
        message: "Student fee record not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: studentFee
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Create a new student fee record
export const createStudentFee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      studentId, 
      studentName, 
      class: className, 
      feeStructureId, 
      academicYear, 
      dueDate 
    } = req.body;
    
    // Use the authenticated institute's ID
    let instituteId = req.body.instituteId;
    if (req.institute && req.institute._id) {
      instituteId = req.institute._id;
    }
    
    if (!instituteId) {
      res.status(400).json({
        success: false,
        message: "Institute ID is required"
      });
      return;
    }

    // Get the fee structure to determine total amount
    const feeStructure = await FeeStructure.findById(feeStructureId);
    if (!feeStructure) {
      res.status(404).json({
        success: false,
        message: "Fee structure not found"
      });
      return;
    }

    // Check if student fee record already exists
    const existingStudentFee = await StudentFee.findOne({
      studentId,
      instituteId,
      academicYear
    });

    if (existingStudentFee) {
      res.status(400).json({
        success: false,
        message: "Student fee record already exists for this academic year"
      });
      return;
    }
    
    // Create student fee record
    const studentFee = await StudentFee.create({
      studentId,
      studentName,
      class: className,
      instituteId,
      feeStructureId,
      academicYear: academicYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      totalFeeAmount: feeStructure.totalFee,
      paidAmount: 0,
      pendingAmount: feeStructure.totalFee,
      dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      payments: []
    });
    
    res.status(201).json({
      success: true,
      data: studentFee
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add a payment to student fee record
export const addPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, method, transactionId, remarks } = req.body;
    
    const studentFee = await StudentFee.findById(req.params.id);
    if (!studentFee) {
      res.status(404).json({
        success: false,
        message: "Student fee record not found"
      });
      return;
    }

    // Validate payment amount
    const paymentAmount = Number(amount);
    if (paymentAmount <= 0) {
      res.status(400).json({
        success: false,
        message: "Payment amount must be greater than zero"
      });
      return;
    }

    if (paymentAmount > studentFee.pendingAmount) {
      res.status(400).json({
        success: false,
        message: "Payment amount cannot exceed pending amount"
      });
      return;
    }

    // Add payment to payments array
    studentFee.payments.push({
      amount: paymentAmount,
      date: new Date(),
      method,
      transactionId,
      remarks
    });

    // Update paid amount
    studentFee.paidAmount += paymentAmount;
    
    // Save (pre-save middleware will calculate pending amount and status)
    await studentFee.save();
    
    res.status(200).json({
      success: true,
      data: studentFee
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update student fee record
export const updateStudentFee = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = req.body;
    
    // Don't allow direct updates to calculated fields
    delete updates.pendingAmount;
    delete updates.paymentStatus;
    delete updates.lastPaymentDate;
    
    const studentFee = await StudentFee.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('feeStructureId', 'class tuitionFee admissionFee examFee totalFee');
    
    if (!studentFee) {
      res.status(404).json({
        success: false,
        message: "Student fee record not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: studentFee
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete student fee record
export const deleteStudentFee = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentFee = await StudentFee.findByIdAndDelete(req.params.id);
    
    if (!studentFee) {
      res.status(404).json({
        success: false,
        message: "Student fee record not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Student fee record deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get payment history for a student
export const getPaymentHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    
    let query: any = { studentId };
    if (req.institute && req.institute._id) {
      query.instituteId = req.institute._id;
    }

    const studentFees = await StudentFee.find(query)
      .populate('feeStructureId', 'class tuitionFee admissionFee examFee totalFee')
      .sort({ academicYear: -1 });
    
    // Extract all payments from all academic years
    const paymentHistory = studentFees.flatMap(fee => 
      fee.payments.map(payment => ({
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        transactionId: payment.transactionId,
        remarks: payment.remarks,
        academicYear: fee.academicYear,
        class: fee.class,
        totalFeeAmount: fee.totalFeeAmount
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    res.status(200).json({
      success: true,
      data: paymentHistory
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};
