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
    .max(7, 'OTP code must be 6 characters'),
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

export const sendVerificationCodeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(60, 'Password must be less than 60 characters'),
});
export const cashierLoginSchema = z.object({
  branch_id: z
    .string()
    .min(1, { message: 'Branch ID is required' })
    .max(50, 'Branch ID must be less than 50 characters'),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(60, 'Password must be less than 60 characters'),
});

export const changePasswordScheme = z.object({
  old_password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(60, 'Password must be less than 60 characters'),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must be less than 60 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Add password requirements message
export const PASSWORD_REQUIREMENTS = {
  message:
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
};

export const buyCardSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  card_amount: z.string().min(1, 'Card amount is required'),
  recipient_name: z.string().min(1, 'Recepient name is required'),
  recipient_email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Recepient email is required'),
  recipient_phone_number: z
    .string()
    .min(1, 'Recepient phone number is required')
    .max(11, 'Recepient phone number must be less than 11 characters'),
  for_who: z.string().min(1, 'For who is required'),
  occasion: z.string().min(1, 'Occasion is required'),
  message: z.string().max(255).optional(),
  image: z.string().optional(),
});
export const uploadCompanyDetailSchema = z.object({
  business_type: z
    .string()
    .min(1, 'Business type is required')
    .max(255, 'Business type must be less than 255 characters'),
  registration_number: z
    .string()
    .min(1, 'Registration number is required')
    .max(255, 'Registration number must be less than 255 characters'),
  date_of_incorporation: z
    .string()
    .min(1, 'Date of incorporation is required')
    .refine(
      (value) => !isNaN(Date.parse(value)),
      'Date of incorporation must be a valid date'
    ),
  tin_number: z
    .string()
    .min(1, 'TIN number is required')
    .max(255, 'TIN number must be less than 255 characters'),
  company_address: z
    .string()
    .min(1, 'Company address is required')
    .max(255, 'Company address must be less than 255 characters'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  upload_cac_document: z
    .any()
    .refine(
      (file) => file instanceof File && file.size <= 10 * 1024 * 1024, // Max size 10MB
      'Upload CAC document must be a valid file and less than 10MB'
    )
    .refine(
      (file) =>
        [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'image/webp',
        ].includes(file?.type),
      'Upload Com;AC document must be a valid image file (JPG, PNG, JPEG, GIF, WEBP)'
    ),
  terms_and_conditions: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const companyDetailsSchema = z.object({
  company_name: z
    .string()
    .min(1, 'Company name is required')
    .max(50, 'Company name must be less than 50 characters'),
  company_email: z.string().email('Invalid email address'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .max(15, 'Phone number must be less than 15 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must be less than 60 characters'),
});

export const branchDetailsSchema = z.object({
  branch_name: z
    .string()
    .min(1, 'Branch name is required')
    .max(50, 'Branch name must be less than 50 characters'),
  branch_address: z
    .string()
    .min(1, 'Branch address is required')
    .max(255, 'Branch address must be less than 255 characters'),
  branch_id: z
    .string()
    .min(1, 'Branch ID is required')
    .max(50, 'Branch ID must be less than 50 characters'),
  branch_password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must be less than 60 characters'),
  is_active: z.boolean().optional(),
});

export const updateUserInfoSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required')
    .max(254, 'Email must be less than 254 characters'),
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(255, 'First name must be less than 255 characters'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(255, 'Last name must be less than 255 characters'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .max(255, 'Phone number must be less than 255 characters'),
});

export const requestPayWithdrawalSchema = z.object({
  bank_name: z
    .string()
    .min(1, 'Bank name is required')
    .max(255, 'Bank name must be less than 255 characters'),
  account_number: z
    .string()
    .min(1, 'Account number is required')
    .max(255, 'Account number must be less than 255 characters'),
  account_holder: z
    .string()
    .min(1, 'Account holder name is required')
    .max(255, 'Account holder name must be less than 255 characters'),
  available_amount: z
    .string()
    .min(1, 'Available amount is required')
    .max(255, 'Available amount must be less than 255 characters'),
  requested_amount: z
    .string()
    .min(1, 'Requested amount is required')
    .max(255, 'Requested amount must be less than 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description must be less than 255 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const changeForgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    otp_code: z.string().min(1, 'OTP code is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(60, 'Password must be less than 60 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export const cardBalanceSchema = z.object({
  card_number: z.string().min(1, 'Card valu e is required'),
  amount: z.string().min(1, 'Amount is required'),
});

export const companyPayOutSchema = z.object({
  account_number: z.string().min(1, { message: 'Account number is required' }),
  bank_name: z.string().min(1, { message: 'Bank name is required' }),
  account_name: z.string().min(1, { message: 'Account name is required' }),
  bank_code: z.string().min(1, { message: 'Bank code is required' }),
  amount: z.string().min(1, { message: 'Amount is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  narration: z.string().optional(),
  branches: z.array(z.string()).min(1, 'Select at least one branch'),
});

export const createBrandSchema = z.object({
  brand_name: z
    .string()
    .min(1, 'Brand name is required')
    .max(255, 'Brand name must be less than 255 characters'),
  category: z.string().min(1, 'Category is required'),
  min_amount: z
    .number()
    .min(0, 'Minimum amount must be greater than or equal to 0')
    .optional(),
  max_amount: z
    .number()
    .min(0, 'Maximum amount must be greater than or equal to 0')
    .optional(),
  is_active: z.boolean().optional(),
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.size <= 1 * 1024 * 1024, // Max size 10MB
      'Image must be a valid file and less than 10MB'
    )
    .refine(
      (file) =>
        [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/gif',
          'image/webp',
        ].includes(file?.type),
      'Image must be a valid image file (JPG, PNG, JPEG, GIF, WEBP)'
    )
    .optional(),
  description: z.string().min(1, ' Descripition is required'),
  branches: z.array(z.string()).min(1, 'Select at least one branch'),
});

//TYPES
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ChangeForgotPasswordType = z.infer<
  typeof changeForgotPasswordSchema
>;
export type CardBalanceType = z.infer<typeof cardBalanceSchema>;
export type RequestPayWithdrawalType = z.infer<
  typeof requestPayWithdrawalSchema
>;
export type UpdateUserInfoType = z.infer<typeof updateUserInfoSchema>;
export type BranchDetailsType = z.infer<typeof branchDetailsSchema>;
export type CompanyDetailsType = z.infer<typeof companyDetailsSchema>;
export type UploadCompanyDetailType = z.infer<typeof uploadCompanyDetailSchema>;
export type BuyCardType = z.infer<typeof buyCardSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordScheme>;
export type CreateAdminAccountType = z.infer<typeof createAdminAccountSchema>;
export type VerifyEmailType = z.infer<typeof verifyEmailSchema>;
export type CreateUserAccountType = z.infer<typeof createUserAccountSchema>;
export type SendVerificationCodeType = z.infer<
  typeof sendVerificationCodeSchema
>;
export type LoginType = z.infer<typeof loginSchema>;
export type CashierLoginType = z.infer<typeof cashierLoginSchema>;
export type CompanyPayOutType = z.infer<typeof companyPayOutSchema>;
export type CreateBrandType = z.infer<typeof createBrandSchema>;
