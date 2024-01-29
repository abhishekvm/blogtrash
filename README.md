This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Problem Statement

Create a simple CRUD APIs for `blog` using **NextJS**, **MySQL** and **Prisma** as ORM. The app should provide ability to restore deleted blogs if user restores it within `2 minutes` from the time it is deleted. After 2 minutes deleted blog is permanently deleted from database  
## Lessons Learnt

1. Getting familiar with NextJS API Routes
1. Basics of Prisma ORM (migrations, transactions)
1. Caveats
   1. Restored blogs from trash gets new `id`.
      1. The deleted blogs are maintained in the separate table `blogtrash`. While restoring blog gets new `id` as `id` is autoincrement key and Prisma adds a check to avoid overriding autoincrement behaviour
      1. This problem may not arise if `id` field is not autoincrement or we chose to bypass Prisma and write raw sql.
   2. Permanent deletion may not work if the NextJS Server is stopped or restarted within `2 minutes` from the blog is deleted.
      1. The permanent deletion is scheduled using `setTimeout` with acts a in-memory cron job

## Getting Started

1. Spin up MySQL Docker container

   ```bash
   docker-compose up -d
   ```

1. Create `.env` file with database connection string

   ```bash
   DATABASE_URL="mysql://root:rootpass@localhost:3306/playground"
   ```

1. Run database migration
   ```bash
   npm run prisma:migrate
   ```
1. Start run the development server
   ```bash
   npm run dev
   ```
   
## APIs

- Use [Postman Collection](blogtrash.postman_collection.json) to browse through APIs

## Prisma

1. For any change in database models, run
   ```bash
   npm run prisma:migrate
   ```
