import { headers } from "next/headers";
import MediaClient from "./mediaclient";

type Video = {
  title: string;
  playbackId: string;
  platform: "LINKEDIN" | "YOUTUBE" | "PRIVATELEARN" | "INSTAGRAM";
  description: string;
  duration: string;
  tags: string[];
};

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

async function getVideos(): Promise<Video[]> {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/media`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return (await res.json()) as Video[];
  } catch {
    return [];
  }
}

export default async function Page() {
  const videos = await getVideos();
  return <MediaClient initialVideos={videos} />;
}
