import { z } from "zod";

export type CreatePostData = {
  title: string;
  description?: string;
  images?: string[]
}

export const createPostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
});