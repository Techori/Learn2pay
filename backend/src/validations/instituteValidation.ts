import { z } from "zod";

export const instituteRegisterSchema = z.object({
  instituteName: z
    .string({
      required_error: "Institute name is required",
      invalid_type_error: "Institute name must be a string",
    })
    .min(3, { message: "Institute name must be at least 3 characters long" })
    .max(100, { message: "Institute name cannot exceed 100 characters" })
    .trim(),

  instituteType: z.enum(
    ["school", "college", "academy", "gym", "other", "coaching"],
    {
      required_error: "Institute type is required",
      invalid_type_error: "Please select a valid institute type",
    }
  ),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .max(500, { message: "Description cannot exceed 500 characters" })
    .trim()
    .optional(),

  contactPerson: z.object({
    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(1, { message: "First name cannot be empty" })
      .max(50, { message: "First name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "First name can only contain letters and spaces",
      })
      .trim(),

    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(1, { message: "Last name cannot be empty" })
      .max(50, { message: "Last name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Last name can only contain letters and spaces",
      })
      .trim(),
  }),

  contactEmail: z
    .string({
      required_error: "Email address is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address" })
    .toLowerCase()
    .trim(),

  contactPhone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^[+]?[\d\s\-()]+$/, {
      message: "Please enter a valid phone number",
    })
    .trim(),

  address: z.object({
    completeAddress: z
      .string({
        required_error: "Complete address is required",
        invalid_type_error: "Address must be a string",
      })
      .min(10, { message: "Complete address must be at least 10 characters" })
      .max(200, { message: "Complete address cannot exceed 200 characters" })
      .trim(),

    city: z
      .string({
        required_error: "City is required",
        invalid_type_error: "City must be a string",
      })
      .min(2, { message: "City name must be at least 2 characters" })
      .max(50, { message: "City name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "City name can only contain letters and spaces",
      })
      .trim(),

    state: z
      .string({
        required_error: "State is required",
        invalid_type_error: "State must be a string",
      })
      .min(2, { message: "State name must be at least 2 characters" })
      .max(50, { message: "State name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "State name can only contain letters and spaces",
      })
      .trim(),

    pinCode: z
      .string({
        required_error: "PIN code is required",
        invalid_type_error: "PIN code must be a string",
      })
      .min(5, { message: "PIN code must be at least 5 characters" })
      .max(10, { message: "PIN code cannot exceed 10 characters" })
      .regex(/^[0-9]+$/, { message: "PIN code can only contain numbers" })
      .trim(),
  }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),

  documents: z.object({
    registerationCertificate: z.boolean({
      required_error: "Registration certificate status is required",
      invalid_type_error: "Registration certificate status must be a boolean",
    }),

    panCard: z.boolean({
      required_error: "PAN card status is required",
      invalid_type_error: "PAN card status must be a boolean",
    }),
  }),

  approved: z
    .boolean({
      invalid_type_error: "Approved status must be a boolean",
    })
    .optional(),

  premiumPlan: z
    .boolean({
      invalid_type_error: "Premium plan status must be a boolean",
    })
    .optional(),

  salesOwner: z
    .string({
      invalid_type_error: "Sales owner must be a string",
    })
    .trim()
    .optional(),

  referralOwner: z
    .string({
      invalid_type_error: "Referral owner must be a string",
    })
    .trim()
    .optional(),
});

export const instituteLoginSchema = z.object({
  contactEmail: z
    .string({
      required_error: "Email address is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Please enter a valid email address" })
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
