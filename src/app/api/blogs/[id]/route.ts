import prisma from '@/app/lib/data';
import { hardDelete, softDelete } from '@/app/lib/blog/actions';

export async function GET(
   req: Request,
   { params }: { params: { id: string } }
) {
   const blog = await prisma.blog.findMany({
      where: { id: Number(params.id) },
   });
   return Response.json(blog);
}

export async function DELETE(
   req: Request,
   { params }: { params: { id: string } }
) {
   const blog = await prisma.blog.findUnique({
      where: { id: Number(params.id) },
   });

   if (blog) {
      await softDelete(blog);

      // Hard Delete in 2 mins
      setTimeout((callback) => hardDelete(blog.id), 1 * 10 * 1000);

      return Response.json(blog);
   } else {
      return new Response(`Blog not found`, {
         status: 404,
      });
   }
}
