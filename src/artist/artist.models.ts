import { z } from 'nestjs-zod/z';

export const createArtistSchema = z.object({
  name: z.string(),
  grammy: z.boolean(),
});

export type Artist = z.infer<typeof createArtistSchema> & { id: string };

export type UpdateArtistRequest = z.infer<typeof createArtistSchema>;
