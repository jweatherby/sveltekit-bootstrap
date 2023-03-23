/*
  Warnings:

  - You are about to drop the column `date_created` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `date_modified` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `emailed_key` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `date_modified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "date_created",
DROP COLUMN "date_modified",
DROP COLUMN "emailed_key",
ADD COLUMN     "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateModified" TIMESTAMP(3),
ADD COLUMN     "emailedKey" VARCHAR;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_created",
DROP COLUMN "date_modified",
DROP COLUMN "full_name",
ADD COLUMN     "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateModified" TIMESTAMP(3),
ADD COLUMN     "fullName" VARCHAR;
