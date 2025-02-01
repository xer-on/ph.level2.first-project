import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be longer than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: 'Last name must be alphanumeric',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father name is required' }),
  fatherOccupation: z.string({ required_error: 'Father occupation is required' }),
  fatherContactNo: z.string({ required_error: 'Father contact number is required' }),
  motherName: z.string({ required_error: 'Mother name is required' }),
  motherOccupation: z.string({ required_error: 'Mother occupation is required' }),
  motherContactNo: z.string({ required_error: 'Mother contact number is required' }),
});

const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required' }),
  occupation: z.string({ required_error: 'Local guardian occupation is required' }),
  contactNo: z.string({ required_error: 'Local guardian contact number is required' }),
  address: z.string({ required_error: 'Local guardian address is required' }),
});

const studentValidationSchema = z.object({
  student: z.object({
    id: z.string({ required_error: 'Student ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], {
      required_error: 'Gender is required',
      invalid_type_error: 'Gender must be either male or female',
    }),
    dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    contactNumber: z.string({ required_error: 'Contact number is required' }),
    emergencyContactNumber: z.string({ required_error: 'Emergency contact number is required' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      invalid_type_error: 'Invalid blood group',
    }).optional(),
    presentAddress: z.string({ required_error: 'Present address is required' }),
    permanentAddress: z.string({ required_error: 'Permanent address is required' }),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().default(false),
  })
});

export const StudentValidation = {
  studentValidationSchema,
};
