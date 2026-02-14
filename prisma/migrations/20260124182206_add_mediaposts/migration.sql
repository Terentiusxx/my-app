-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('LINKEDIN', 'YOUTUBE', 'PRIVATELEARN', 'INSTAGRAM');

-- CreateTable
CREATE TABLE "MediaPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "playbackId" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "description" TEXT NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaPost_pkey" PRIMARY KEY ("id")
);
