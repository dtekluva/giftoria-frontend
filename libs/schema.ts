import { z } from 'zod';

export const createAdminAccountSchema = z.object({
  company_name: z
    .string()
    .min(1, {
      message: 'Company name is required',
    })
    .max(50, 'Company name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  phone_number: z
    .string()
    .min(1, {
      message: 'Phone number is required',
    })
    .max(11, 'Phone number must be less than 11 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must be less than 60 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  promote_notification: z.boolean().optional(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp_code: z
    .string()
    .min(1, {
      message: 'OTP code is required',
    })
    .max(6, 'OTP code must be 6 characters'),
});

export const createUserAccountSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, 'First name must be less than 50 characters'),
  last_name: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  phone_number: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .max(11, 'Phone number must be less than 11 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must be less than 60 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  promotion_notification: z.boolean().optional(),
});

export type CreateAdminAccountType = z.infer<typeof createAdminAccountSchema>;
export type VerifyEmailType = z.infer<typeof verifyEmailSchema>;
export type CreateUserAccountType = z.infer<typeof createUserAccountSchema>;
