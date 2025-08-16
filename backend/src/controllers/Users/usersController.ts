import User from "../../models/usersModel";
import { Request, Response } from "express";
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").populate("institute", "instituteName");
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching Users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
