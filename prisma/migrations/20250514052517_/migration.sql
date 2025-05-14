/*
  Warnings:

  - You are about to drop the column `sectionId` on the `field` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_sectionId_fkey`;

-- AlterTable
ALTER TABLE `field` DROP COLUMN `sectionId`;
