import PublicationUI from "../../components/pageui/publicationui";
import { Publication } from "@/lib/types"
import { api } from "@/lib/api"


export default async function Page() {
  const publications = await api<Publication[]>("/api/publications");
  return <PublicationUI initialPublications={publications} />;
}
