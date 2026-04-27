export type Publication = {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  link: string;
  abstract: string;
  researchArea: string[];
  method: string[];
  keywords: string[];
  openAccess?: boolean;
};

export type Video = {
  title: string;
  playbackId: string;
  platform: "LINKEDIN" | "YOUTUBE" | "PRIVATELEARN" | "INSTAGRAM";
  description: string;
  duration: string;
  tags: string[];
};

// Mirrors the Prisma schema exactly — keep in sync with schema.prisma

export type TestimonialType = "INDIVIDUAL" | "COHORT";

export interface Testimonial {
  id: string;
  message: string;
  authorLabel: string;
  institution: string | null;
  type: TestimonialType;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// metricsJson is untyped in Prisma (Json field) — we own the shape here
export interface MetricHighlight {
  label: string;
  value: string;
}

export interface SurveyEvidence {
  id: string;
  title: string;
  institution: string | null;
  cohortLabel: string | null;
  respondentCount: number;
  metricsJson: MetricHighlight[];       // parsed from Json
  selectedCommentsJson: string[] | null; // parsed from Json
  createdAt: string;
  updatedAt: string;
}
