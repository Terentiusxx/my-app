-- CreateEnum
CREATE TYPE "TestimonialType" AS ENUM ('INDIVIDUAL', 'COHORT');

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "authorLabel" TEXT NOT NULL,
    "institution" TEXT,
    "type" "TestimonialType" NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
