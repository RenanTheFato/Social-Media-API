/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "author" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "author" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_username_key" ON "users"("id", "username");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_author_fkey" FOREIGN KEY ("userId", "author") REFERENCES "users"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_author_fkey" FOREIGN KEY ("userId", "author") REFERENCES "users"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;
