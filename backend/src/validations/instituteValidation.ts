import { z } from "zod";

export const instituteRegisterSchema = z.object({
  instituteName: z.string().min(3),
  instituteType: z.enum(["school", "college", "university", "other"]),
  description: z.string().optional(),

  contactPerson: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),

  contactEmail: z.string().email(),
  contactPhone: z.string().min(10),

  address: z.object({
    completeAddress: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    pinCode: z.string().min(5),
  }),

  password: z.string().min(6),

  documents: z.object({
    registerationCertificate: z.boolean(),
    panCard: z.boolean(),
  }),

  approved: z.boolean().optional(),
  premiumPlan: z.boolean().optional(),
  salesOwner: z.string().optional(),
  referralOwner: z.string().optional(),
});

export const instituteLoginSchema = z.object({
  contactEmail: z.string().email(),
  password: z.string().min(6),
});
