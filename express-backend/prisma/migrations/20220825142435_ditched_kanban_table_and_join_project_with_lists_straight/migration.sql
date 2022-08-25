/*
  Warnings:

  - You are about to drop the column `kanbanId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the `Kanban` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Kanban` DROP FOREIGN KEY `Kanban_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `List` DROP FOREIGN KEY `List_kanbanId_fkey`;

-- AlterTable
ALTER TABLE `List` DROP COLUMN `kanbanId`,
    ADD COLUMN `projectId` INTEGER NULL;

-- DropTable
DROP TABLE `Kanban`;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
