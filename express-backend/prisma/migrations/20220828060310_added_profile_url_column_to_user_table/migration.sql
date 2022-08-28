/*
  Warnings:

  - Added the required column `profileUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileUrl` VARCHAR(191) NOT NULL;
