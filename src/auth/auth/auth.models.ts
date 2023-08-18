import { z } from 'nestjs-zod/z';

export const singInSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type SignIn = z.infer<typeof singInSchema>;

