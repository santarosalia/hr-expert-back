/*
  Warnings:

  - You are about to drop the column `name` on the `fielditem` table. All the data in the column will be lost.
  - Added the required column `key` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `FieldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `FieldItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `field` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `fielditem` DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `section` ADD COLUMN `key` VARCHAR(191) NOT NULL;
