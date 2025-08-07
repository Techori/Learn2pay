import { Request, Response } from 'express';
import Ticket from '../models/ticketsModel';
import mongoose from 'mongoose';

// Get all tickets with filtering and pagination
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, priority, category, search, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (status && status !== '') {
      filter.status = status;
    }
    
    if (priority && priority !== '') {
      filter.priority = priority;
    }
    
    if (category && category !== '') {
      filter.category = category;
    }
    
    // Search functionality
    if (search && search !== '') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;
    
    const tickets = await Ticket.find(filter)
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);
    
    const total = await Ticket.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNumber);
    
    res.status(200).json({
      success: true,
      data: tickets,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNumber
      }
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tickets',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single ticket by ID
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID'
      });
      return;
    }

    const ticket = await Ticket.findById(id)
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email');

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, message, priority = 'Medium', institute, raisedBy } = req.body;

    if (!title || !category || !message) {
      res.status(400).json({
        success: false,
        message: 'Title, category, and message are required'
      });
      return;
    }

    const ticket = new Ticket({
      title,
      category,
      message,
      priority,
      status: 'New',
      institute,
      raisedBy
    });

    const savedTicket = await ticket.save();
    const populatedTicket = await Ticket.findById(savedTicket._id)
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email');

    res.status(201).json({
      success: true,
      data: populatedTicket,
      message: 'Ticket created successfully'
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update ticket
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID'
      });
      return;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email');

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
      message: 'Ticket updated successfully'
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete ticket
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID'
      });
      return;
    }

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update ticket status
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID'
      });
      return;
    }

    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Status is required'
      });
      return;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email');

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
      message: 'Ticket status updated successfully'
    });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating ticket status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Assign ticket to user
export const assignTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { assignee } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID'
      });
      return;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignee },
      { new: true, runValidators: true }
    )
      .populate('raisedBy', 'name email')
      .populate('assignee', 'name email');

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
      message: 'Ticket assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}
