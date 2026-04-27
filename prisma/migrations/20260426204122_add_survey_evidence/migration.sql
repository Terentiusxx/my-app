-- CreateTable
CREATE TABLE "surveyEvidence" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT,
    "cohortLabel" TEXT,
    "respondentCount" INTEGER NOT NULL,
    "metricsJson" JSONB NOT NULL,
    "selectedCommentsJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveyEvidence_pkey" PRIMARY KEY ("id")
);
