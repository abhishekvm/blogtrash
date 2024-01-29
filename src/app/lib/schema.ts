import { z } from 'zod';

const BlogSchema = z.object({
   id: z.string(),
   name: z.string(),
   description: z.string(),
   content: z.string(),
   createdAt: z.string().datetime(),
});

export const CreateBlogSchema = BlogSchema.omit({ id: true, createdAt: true });
