/*
  Warnings:

  - You are about to drop the column `value` on the `orderitems` table. All the data in the column will be lost.
  - Added the required column `price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitems` DROP COLUMN `value`,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL;
