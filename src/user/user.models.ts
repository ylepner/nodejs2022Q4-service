import { z } from 'nestjs-zod/z';
export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export const createUserSchema = z.object({
  login: z.string(),
  password: z.string().min(8),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
});
export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
