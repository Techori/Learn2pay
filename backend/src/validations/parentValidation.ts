import z from "zod";

const studentRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  parentName: z.string().min(1, "Parent name is required"),
  parentEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  parentPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.number().min(0, "Invalid age"),
  grade: z.string().min(1, "Grade is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  address: z.object({
    completeAddress: z.string().min(1, "Complete address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string().min(1, "Pin code is required"),
  }),
  instituteName: z.string().min(1, "Institute name is required"),
});

const parentLoginSchema = z.object({
  parentEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export { studentRegisterSchema, parentLoginSchema };
