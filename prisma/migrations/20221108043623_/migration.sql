/*
  Warnings:

  - You are about to drop the column `companyId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `companyId`;

-- DropTable
DROP TABLE `posts`;
