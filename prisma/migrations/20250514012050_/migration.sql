/*
  Warnings:

  - Added the required column `order` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `section` ADD COLUMN `order` INTEGER NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
