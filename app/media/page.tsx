import { headers } from "next/headers";
import MediaClient from "../../components/pageui/mediaclient";
import { Video } from "@/lib/types"
import { api } from "@/lib/api"

export default async function Page() {
  const videos = await api<Video[]>("/api/media");
  return <MediaClient initialVideos={videos} />;
}
