/**
 * Shared Zod schemas — used by both the client (forms) and the server
 * (route handlers). Single source of truth for validation.
 */
import { PERMISSIONS, ROLES } from '@/config/roles.config';
import { z } from 'zod';

const roleEnum = z.enum(ROLES as unknown as [string, ...string[]]);
const permissionEnum = z.enum(PERMISSIONS as unknown as [string, ...string[]]);

// --- Primitives ---
export const usernameSchema = z
  .string()
  .min(3, 'At least 3 characters')
  .max(20, 'At most 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers, and underscores only');

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'One uppercase letter')
  .regex(/[a-z]/, 'One lowercase letter')
  .regex(/[0-9]/, 'One number')
  .regex(/[^A-Za-z0-9]/, 'One special character');

// --- Auth ---
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    inviteCode: z.string().optional(),
    acceptTerms: z.literal(true, { message: 'You must accept the terms' }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, '6-digit code'),
});

// --- Profile ---
export const profileUpdateSchema = z.object({
  displayName: z.string().max(50).optional(),
  bio: z.string().max(280).optional(),
  pronouns: z.string().max(30).optional(),
  location: z.string().max(50).optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
});

// --- Pagination ---
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// --- Admin ---
export const USER_STATUSES = ['active', 'pending', 'suspended', 'banned'] as const;

export const adminUserListSchema = z.object({
  q: z.string().trim().optional(),
  role: roleEnum.optional(),
  status: z.enum(USER_STATUSES).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export const adminUserUpdateSchema = z
  .object({
    role: roleEnum.optional(),
    status: z.enum(USER_STATUSES).optional(),
  })
  .refine((d) => d.role !== undefined || d.status !== undefined, {
    message: 'Provide a role and/or status to update.',
  });

export const roleUpdateSchema = z.object({
  permissions: z.array(permissionEnum),
});

export const adminUserCreateSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  displayName: z.string().trim().max(50).optional(),
  role: roleEnum,
  password: z.string().min(8, 'At least 8 characters'),
});

// --- Inferred types ---
export type AdminUserListInput = z.infer<typeof adminUserListSchema>;
export type AdminUserUpdateInput = z.infer<typeof adminUserUpdateSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;
export type AdminUserCreateInput = z.infer<typeof adminUserCreateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
