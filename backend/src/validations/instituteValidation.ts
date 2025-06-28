import { z } from "zod";

export const instituteRegisterSchema = z.object({
  institute_name: z.string().min(3),
  institute_type: z.enum(["school", "college", "university", "other"]),
  description: z.string().optional(),
  contact_person: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),
  address: z.object({
    completeAddress: z.string(),
    city: z.string(),
    state: z.string(),
    pinCode: z.string().min(5),
  }),
  password: z.string().min(6),
  documents: z.object({
    registerationCertificate: z.boolean(),
    panCard: z.boolean(),
  }),
});

export const instituteLoginSchema = z.object({
  contactEmail: z.string().email(),
  password: z.string().min(6),
});
