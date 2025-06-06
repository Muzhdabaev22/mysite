-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_IDEAS', 'ALL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
