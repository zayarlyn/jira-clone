/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pwd` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Issue_order_key` ON `Issue`;

-- DropIndex
DROP INDEX `List_order_key` ON `List`;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `pwd` VARCHAR(191) NOT NULL;
