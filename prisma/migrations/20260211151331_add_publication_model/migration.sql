-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "year" INTEGER NOT NULL,
    "journal" TEXT NOT NULL,
    "volume" TEXT,
    "pages" TEXT,
    "doi" TEXT,
    "link" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "researchArea" TEXT[],
    "method" TEXT[],
    "keywords" TEXT[],
    "openAccess" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);
