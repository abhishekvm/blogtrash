import prisma from '@/app/lib/data';
import { CreateBlogSchema } from '@/app/lib/schema';

export async function GET() {
   const blogs = await prisma.blog.findMany();
   return Response.json(blogs);
}

export async function POST(req: Request) {
   const data = await req.json();
   const parsedData = CreateBlogSchema.parse(data);
   const blog = await prisma.blog.create({ data: parsedData });
   return Response.json(blog);
}
