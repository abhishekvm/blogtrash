import prisma from '@/app/lib/data';
import { restore } from '@/app/lib/blog/actions';

export async function POST(
   req: Request,
   { params }: { params: { id: string } }
) {
   const blog = await prisma.blogTrash.findUnique({
      where: { id: Number(params.id) },
   });

   if (blog) {
      const restoredBlog = await restore(blog);
      return Response.json(restoredBlog);
   } else {
      return new Response(`Blog not found in trash`, {
         status: 404,
      });
   }
}
