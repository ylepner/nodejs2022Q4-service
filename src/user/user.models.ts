import { z } from 'nestjs-zod/z';
export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export interface UserDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export const createUserSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
