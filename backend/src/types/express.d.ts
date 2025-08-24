import { Document, ObjectId } from "mongoose";

export interface IInstitute {
  _id: any;
  instituteName: string;
  instituteType: "School" | "College" |"Academy"| "Coaching" |"Other"| "Gym";
  description?: string | null;
  contactPerson?: {
    firstName: string;
    lastName: string;
  } | null;
  contactEmail: string;
  contactPhone: string;
  address?: {
    completeAddress: string;
    city: string;
    state: string;
    pinCode: string;
  } | null;
  password: string;
  documents?: {
    registerationCertificate: boolean;
    panCard: boolean;
  } | null;
  createdAt?: Date;
  updatedAt?: Date;
  joinDate?: Date;
  kycStatus?: "Not Started" | "Pending" | "Under Review" | "Verified" | "Approved" | "Rejected";
  approved?: boolean;
  totalNoOfStudents: Number;
}

export interface IStudent {
  _id: any;
  name: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  password: string;
  dateOfBirth: Date;
  age: number;
  grade: string;
  rollNumber: string;
  address?: {
    completeAddress: string;
    city: string;
    state: string;
    pinCode: string;
  } | null;
  instituteName: string;
}

export interface IUser {
  _id: any;
  fullName: string;
  email: string;
  role: string;
  teamLead?: any;
  institute?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

declare global {
  namespace Express {
    interface Request {
      institute?: IInstitute;
      parent?: IStudent;
      salesUser?: IUser;
      user?: {
        role: "institute" | "parent" | "sales_person" | "sales_manager" | "admin";
        id?: string;
        studentId?: string;
        instituteId?: string;
        userId?: string;
        email: string;
        instituteName?: string;
        parentName?: string;
        fullName?: string;
      };
    }
  }
}
