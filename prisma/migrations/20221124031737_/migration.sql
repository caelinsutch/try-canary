-- AlterTable
ALTER TABLE `Post` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `logo` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `postId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
