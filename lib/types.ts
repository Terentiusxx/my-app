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