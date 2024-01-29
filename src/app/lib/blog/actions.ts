'use server';

import { Blog, BlogTrash } from '.prisma/client';
import prisma from '@/app/lib/data';
import { CreateBlogSchema } from '@/app/lib/schema';

export async function softDelete(blog: Blog) {
   await prisma.$transaction([
      prisma.blog.delete({ where: { id: blog.id } }),
      prisma.blogTrash.create({
         data: { ...blog, ...{ deletedAt: new Date() } },
      }),
   ]);
}

export async function hardDelete(id: number) {
   await prisma.blogTrash.delete({ where: { id: id } });
}

export async function restore(blog: BlogTrash) {
   console.log(`Restoring Blog with id ${blog.id}`);
   const parsedData = CreateBlogSchema.parse(blog);
   return prisma.$transaction(async (tx) => {
      const restoredBlog = tx.blog.create({
         data: parsedData,
      });

      tx.blogTrash.delete({ where: { id: blog.id } });

      return restoredBlog;
   });
}
