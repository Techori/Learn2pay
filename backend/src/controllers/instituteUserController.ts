import { Request, Response } from 'express';
import InstituteUser from '../models/instituteUserModel';

// Get all institute users for a specific institute
export const getAllInstituteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.user || {};
    
    if (!instituteId) {
      res.status(400).json({ 
        success: false, 
        message: 'Institute ID is required' 
      });
      return;
    }

    const users = await InstituteUser.find({ instituteId })
      .populate('instituteId', 'instituteName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching institute users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch institute users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create a new institute user
export const createInstituteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.user || {};
    const { name, email, contact, password, role, permissions } = req.body;

    if (!instituteId) {
      res.status(400).json({ 
        success: false, 
        message: 'Institute ID is required' 
      });
      return;
    }

    // Check if user with this email already exists
    const existingUser = await InstituteUser.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    const newUser = new InstituteUser({
      name,
      email,
      contact,
      password,
      role,
      permissions: permissions || 'Basic Access',
      instituteId
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Institute user created successfully',
      data: newUser
    });
  } catch (error) {
    console.error('Error creating institute user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create institute user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update institute user
export const updateInstituteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.user || {};
    const { userId } = req.params;
    const updateData = req.body;

    if (!instituteId) {
      res.status(400).json({ 
        success: false, 
        message: 'Institute ID is required' 
      });
      return;
    }

    // Remove password from update data if it's empty
    if (updateData.password === '') {
      delete updateData.password;
    }

    const user = await InstituteUser.findOneAndUpdate(
      { _id: userId, instituteId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Institute user updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating institute user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update institute user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete institute user
export const deleteInstituteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.user || {};
    const { userId } = req.params;

    if (!instituteId) {
      res.status(400).json({ 
        success: false, 
        message: 'Institute ID is required' 
      });
      return;
    }

    const user = await InstituteUser.findOneAndDelete({ 
      _id: userId, 
      instituteId 
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Institute user deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting institute user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete institute user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
export const updateUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteId } = req.user || {};
    const { userId } = req.params;
    const { status } = req.body;

    if (!instituteId) {
      res.status(400).json({ 
        success: false, 
        message: 'Institute ID is required' 
      });
      return;
    }

    const user = await InstituteUser.findOneAndUpdate(
      { _id: userId, instituteId },
      { status },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `User ${status.toLowerCase()} successfully`,
      data: user
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
// Update last login
export const updateLastLogin = async (userId: string) => {
  try {
    await InstituteUser.findByIdAndUpdate(userId, {
      lastLogin: new Date()
    });
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};
