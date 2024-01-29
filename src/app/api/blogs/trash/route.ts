import prisma from '@/app/lib/data';
import { CreateBlogSchema } from '@/app/lib/schema';

export async function GET() {
   const blogs = await prisma.blogTrash.findMany();
   return Response.json(blogs);
}
