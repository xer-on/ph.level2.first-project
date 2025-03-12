import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
});

export const UserValidation = {
  userValidationSchema,
};
