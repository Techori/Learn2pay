import { Request, Response } from "express";
import FeeStructure from "../models/feeStructureModel";

// Get all fee structures
export const getAllFeeStructures = async (req: Request, res: Response): Promise<void> => {
  try {
    // If user is authenticated and has an institute, filter by that institute
    let query = {};
    
    // Check if the request has an authenticated institute
    if (req.institute && req.institute._id) {
      query = { instituteId: req.institute._id };
    } else if (req.query.instituteId) {
      // Fallback to query parameter
      query = { instituteId: req.query.instituteId };
    }
    
    const feeStructures = await FeeStructure.find(query).sort({ class: 1 });
    
    res.status(200).json({
      success: true,
      count: feeStructures.length,
      data: feeStructures
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get fee structure by ID
export const getFeeStructureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const feeStructure = await FeeStructure.findById(req.params.id);
    
    if (!feeStructure) {
      res.status(404).json({
        success: false,
        message: "Fee structure not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: feeStructure
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Create a new fee structure
export const createFeeStructure = async (req: Request, res: Response): Promise<void> => {
  try {
    const { class: className, tuitionFee, admissionFee, examFee, academicYear } = req.body;
    
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
    
    // Calculate total fee
    const totalFee = Number(tuitionFee) + Number(admissionFee) + Number(examFee);
    
    // Create fee structure
    const feeStructure = await FeeStructure.create({
      class: className,
      tuitionFee,
      admissionFee,
      examFee,
      totalFee,
      academicYear: academicYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      instituteId
    });
    
    res.status(201).json({
      success: true,
      data: feeStructure
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update fee structure
export const updateFeeStructure = async (req: Request, res: Response): Promise<void> => {
  try {
    const { class: className, tuitionFee, admissionFee, examFee, academicYear } = req.body;
    
    // Calculate total fee if any of the fee components have changed
    let updateData: any = req.body;
    if (tuitionFee !== undefined || admissionFee !== undefined || examFee !== undefined) {
      const feeStructure = await FeeStructure.findById(req.params.id);
      if (!feeStructure) {
        res.status(404).json({
          success: false,
          message: "Fee structure not found"
        });
        return;
      }
      
      const newTuitionFee = tuitionFee !== undefined ? tuitionFee : feeStructure.tuitionFee;
      const newAdmissionFee = admissionFee !== undefined ? admissionFee : feeStructure.admissionFee;
      const newExamFee = examFee !== undefined ? examFee : feeStructure.examFee;
      
      updateData.totalFee = Number(newTuitionFee) + Number(newAdmissionFee) + Number(newExamFee);
    }
    
    const feeStructure = await FeeStructure.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!feeStructure) {
      res.status(404).json({
        success: false,
        message: "Fee structure not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: feeStructure
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete fee structure
export const deleteFeeStructure = async (req: Request, res: Response): Promise<void> => {
  try {
    const feeStructure = await FeeStructure.findByIdAndDelete(req.params.id);
    
    if (!feeStructure) {
      res.status(404).json({
        success: false,
        message: "Fee structure not found"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Fee structure deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get fee structures by institute ID
export const getFeeStructuresByInstitute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.params;
    
    const feeStructures = await FeeStructure.find({ instituteId }).sort({ class: 1 });
    
    res.status(200).json({
      success: true,
      count: feeStructures.length,
      data: feeStructures
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};
