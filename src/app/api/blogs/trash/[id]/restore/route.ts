import prisma from '@/app/lib/data';
import { restore } from '@/app/lib/blog/actions';
import * as dateMath from 'date-arithmetic';

export async function POST(
   req: Request,
   { params }: { params: { id: string } }
) {
   const currentDate = new Date();
   const threshold = dateMath.subtract(currentDate, 2, 'minutes');

   // Blog can be restored only withing 2 minutes, anything deleted before 2 minutes can't be restored
   // and will eventually get deleted permanently by external scheduler list
   const blog = await prisma.blogTrash.findFirst({
      where: {
         AND: [{ id: Number(params.id) }, { deletedAt: { gt: threshold } }],
      },
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
