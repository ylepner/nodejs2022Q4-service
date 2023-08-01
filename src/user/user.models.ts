import { z } from 'nestjs-zod/z';
export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export type UserDto = Omit<User, 'password'>;

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
