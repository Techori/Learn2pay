import { Request, Response } from 'express';
import Lead from '../models/leadsModel';
import mongoose from 'mongoose';

// Get all leads with optional filtering
export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stage, startDate, endDate, search, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (stage && stage !== '') {
      filter.stage = stage;
    }
    
    if (startDate || endDate) {
      filter.lastUpdated = {};
      if (startDate) {
        filter.lastUpdated.$gte = new Date(startDate as string);
      }
      if (endDate) {
        filter.lastUpdated.$lte = new Date(endDate as string);
      }
    }
    
    // Search functionality
    if (search && search !== '') {
      filter.$or = [
        { leadName: { $regex: search, $options: 'i' } },
        { instituteName: { $regex: search, $options: 'i' } },
        { contactPhone: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;
    
    const leads = await Lead.find(filter)
      .populate('salesOwner', 'name email')
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(limitNumber);
    
    const total = await Lead.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNumber);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalLeads: total,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID'
      });
      return;
    }
    
    const lead = await Lead.findById(id).populate('salesOwner', 'name email');
    
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lead',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leadName, instituteName, contactPhone, salesOwner, stage } = req.body;
    
    // Validation
    if (!leadName || !instituteName || !contactPhone || !stage) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: leadName, instituteName, contactPhone, stage'
      });
      return;
    }
    
    // Check if lead with same contact already exists
    const existingLead = await Lead.findOne({ contactPhone });
    if (existingLead) {
      res.status(400).json({
        success: false,
        message: 'Lead with this contact number already exists'
      });
      return;
    }
    
    const newLead = new Lead({
      leadName,
      instituteName,
      contactPhone,
      salesOwner: salesOwner || null,
      stage,
      lastUpdated: new Date()
    });
    
    const savedLead = await newLead.save();
    const populatedLead = await Lead.findById(savedLead._id).populate('salesOwner', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: populatedLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating lead',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update lead
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { leadName, instituteName, contactPhone, salesOwner, stage } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID'
      });
      return;
    }
    
    // Check if lead exists
    const existingLead = await Lead.findById(id);
    if (!existingLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    // Check if contact number is being changed and if it conflicts with another lead
    if (contactPhone && contactPhone !== existingLead.contactPhone) {
      const conflictingLead = await Lead.findOne({ 
        contactPhone, 
        _id: { $ne: id } 
      });
      if (conflictingLead) {
        res.status(400).json({
          success: false,
          message: 'Another lead with this contact number already exists'
        });
        return;
      }
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        ...(leadName && { leadName }),
        ...(instituteName && { instituteName }),
        ...(contactPhone && { contactPhone }),
        ...(salesOwner && { salesOwner }),
        ...(stage && { stage }),
        lastUpdated: new Date()
      },
      { new: true, runValidators: true }
    ).populate('salesOwner', 'name email');
    
    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete lead
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID'
      });
      return;
    }
    
    const deletedLead = await Lead.findByIdAndDelete(id);
    
    if (!deletedLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: deletedLead
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting lead',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update lead stage
export const updateLeadStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { stage } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID'
      });
      return;
    }
    
    if (!stage) {
      res.status(400).json({
        success: false,
        message: 'Stage is required'
      });
      return;
    }
    
    const validStages = ['New', 'Contacted', 'KYC Submitted', 'Onboarded'];
    if (!validStages.includes(stage)) {
      res.status(400).json({
        success: false,
        message: 'Invalid stage. Valid stages are: ' + validStages.join(', ')
      });
      return;
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { 
        stage,
        lastUpdated: new Date()
      },
      { new: true, runValidators: true }
    ).populate('salesOwner', 'name email');
    
    if (!updatedLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Lead stage updated successfully',
      data: updatedLead
    });
  } catch (error) {
    console.error('Error updating lead stage:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead stage',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
