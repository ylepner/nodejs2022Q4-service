import { z } from 'nestjs-zod/z';

export const createAlbumSchema = z.object({
  name: z.string(),
  year: z.number(),
  artistId: z.string().nullable().optional(),
});

export type Album = z.infer<typeof createAlbumSchema> & { id: string };

export type UpdateAlbumRequest = z.infer<typeof createAlbumSchema>;
