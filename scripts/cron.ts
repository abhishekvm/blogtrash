import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as dateMath from 'date-arithmetic';

import cron from 'node-cron';

const schedule = '1-59/5 * * * * *'; // Every 5 seconds

async function deleteFromBlogTrash() {
   const currentDate = new Date();
   const threshold = dateMath.subtract(currentDate, 2, 'minutes');
   console.log(
      `Current Time: ${currentDate} Deleting blogs from trash older than ${threshold}`
   );
   const result = await prisma.blogTrash.deleteMany({
      where: { deletedAt: { lt: threshold } },
   });
   console.log(`Deleted ${result.count} blogs`);
}

async function main() {
   console.log('Starting Cron Job running every 5 seconds...');
   cron.schedule(schedule, deleteFromBlogTrash);
}

main().catch((err) => {
   console.error(
      'An error occurred while attempting to seed the database:',
      err
   );
});
