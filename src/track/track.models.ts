import { z } from 'nestjs-zod/z';

export const createTrackSchema = z.object({
  name: z.string(),
  artistId: z.string().uuid().nullable().optional(),
  albumId: z.string().uuid().nullable().optional(),
  duration: z.number().positive(),
});

export type Track = z.infer<typeof createTrackSchema> & { id: string };

export type UpdateRequest = z.infer<typeof createTrackSchema>;
