import prisma from '@/app/lib/data';
import { hardDelete, softDelete } from '@/app/lib/blog/actions';

export async function GET(
   req: Request,
   { params }: { params: { id: string } }
) {
   const blog = await prisma.blog.findMany({
      where: { id: Number(params.id) },
   });

   if (blog.length !== 0) {
      return Response.json(blog);
   } else {
      return new Response(`Blog not found`, {
         status: 404,
      });
   }
}

export async function DELETE(
   req: Request,
   { params }: { params: { id: string } }
) {
   const blog = await prisma.blog.findUnique({
      where: { id: Number(params.id) },
   });

   if (blog) {
      // Blogs will get deleted permanently after 2 minutes by external scheduler service
      await softDelete(blog);
      return Response.json(blog);
   }
   return new Response(`Blog not found`, {
      status: 404,
   });
}
