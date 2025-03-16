-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "hideComments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hideLikes" BOOLEAN NOT NULL DEFAULT false;
