import { Document, ObjectId } from "mongoose";

export interface IInstitute {
  _id: any;
  instituteName: string;
  instituteType: "school" | "college" | "university" |"academy"| "other";
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

declare global {
  namespace Express {
    interface Request {
      institute?: IInstitute;
      parent?: IStudent;
      user?: {
        role: "institute" | "parent";
        studentId?: string;
        instituteId?: string;
        email: string;
        instituteName?: string;
        parentName?: string;
      };
    }
  }
}
