import { Document, ObjectId } from 'mongoose';

export interface ITicket extends Document {
  _id: ObjectId;
  title: string;
  institute?: {
    _id: ObjectId;
    name: string;
  };
  raisedBy?: {
    _id: ObjectId;
    name: string;
    email: string;
  };
  category: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  assignee?: {
    _id: ObjectId;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
