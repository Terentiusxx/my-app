import { headers } from "next/headers";
import publicationui from "./publicationui";

type Video = {
  title: string;
  playbackId: string;
  platform: "LINKEDIN" | "YOUTUBE" | "PRIVATELEARN" | "INSTAGRAM";
  description: string;
  duration: string;
  tags: string[];
};


// Publication type definition
type Publication = {
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

// Publications data
const allPublications: Publication[] = [
  {
    title: "The Psychosocial Outcomes Following Cosmetic Surgery Are Largely Unknown: A Systematic Review",
    authors: ["Garbett, K.M.", "Anquandah, J.", "Krebs, G.", "Williamson, H.", "Rumsey, N.", "Harcourt, D."],
    year: 2025,
    journal: "Journal of Plastic, Reconstructive & Aesthetic Surgery",
    volume: "104",
    pages: "282-297",
    doi: "10.1016/j.bjps.2025.01.014",
    link: "https://www.jprasurg.com/article/S1748-6815(25)00181-0/fulltext",
    abstract: "A systematic review assessing the highest-quality evidence on how cosmetic surgery affects body image, self-esteem, and mental health. Findings show short-term gains in area-specific satisfaction but limited evidence for long-term mental health benefits.",
    researchArea: ["Health"],
    method: ["Statistical Modelling"],
    keywords: ["Cosmetic Surgery", "Mental Health", "Self-Esteem", "Psychosocial Outcomes", "Systematic Review"],
    openAccess: true,
  },
  {
    title: "My Body Is Amazing from the Bottom to the Top: An RCT Study Testing Two Positive Body Image Media Micro-Interventions for Young Children",
    authors: ["Anquandah, J.", "Slater, A.", "Hatton, R."],
    year: 2025,
    journal: "Body Image",
    volume: "52",
    pages: "101814",
    doi: "10.1016/j.bodyim.2025.101814",
    link: "https://www.sciencedirect.com/science/article/pii/S1740144525000026",
    abstract: "A randomized controlled trial exploring two short media-based interventions designed to foster positive body image in children aged 4–6. Results indicate significant improvements in body appreciation and functionality appreciation.",
    researchArea: ["Health", "Education"],
    method: ["RCT"],
    keywords: ["Body Image", "Children", "Media Intervention", "RCT", "Early Childhood"],
    openAccess: false,
  },
  {
    title: "Changes in Attitudes Towards Telemedicine in Acute Burn Care Following the Covid-19 Pandemic",
    authors: ["Anquandah, J.", "Davies, M.", "Roberts, A."],
    year: 2024,
    journal: "Burns",
    volume: "50",
    pages: "1842-1850",
    doi: "10.1016/j.burns.2024.06.008",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0305417924001505",
    abstract: "A comparative study of clinicians' perceptions of telemedicine barriers and enablers for burn care before and after the Covid-19 pandemic. Shows increased acceptance but persistent concerns about clinical assessment quality.",
    researchArea: ["Health"],
    method: ["Statistical Modelling"],
    keywords: ["Telemedicine", "Burn Care", "Covid-19", "Healthcare Technology", "Clinician Attitudes"],
    openAccess: false,
  },
  {
    title: "Achieving the Health and Well-being SDGs Among Adolescent Mothers and Their Children in South Africa",
    authors: ["Anquandah, J.", "Daniels, K.", "Otieno, P."],
    year: 2022,
    journal: "PLOS ONE",
    volume: "17",
    pages: "e0278163",
    doi: "10.1371/journal.pone.0278163",
    link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0278163",
    abstract: "A cross-sectional analysis of SDG progress among adolescent mothers and their children in an HIV-endemic South African district. Identifies significant gaps in maternal education and child nutrition indicators.",
    researchArea: ["Health", "Youth"],
    method: ["Statistical Modelling"],
    keywords: ["SDGs", "Adolescent Health", "HIV", "South Africa", "Mother and Child", "Public Health"],
    openAccess: true,
  },
  {
    title: "Optimal Stopping for Actuarial Use: A Study on Unemployment Insurance Schemes",
    authors: ["Anquandah, J."],
    year: 2020,
    journal: "PhD Thesis, University of Leeds",
    link: "https://etheses.whiterose.ac.uk/id/eprint/28075/",
    abstract: "A doctoral thesis examining entry strategies into unemployment insurance using stochastic models and real labor force data from the UK. Develops optimal stopping frameworks for insurance timing decisions.",
    researchArea: ["Labour"],
    method: ["Statistical Modelling", "Machine Learning"],
    keywords: ["Optimal Stopping", "Unemployment", "Actuarial Science", "Labor Data", "Stochastic Modelling"],
    openAccess: true,
  },
  {
    title: "Optimal Stopping and Utility in a Simple Model of Unemployment Insurance",
    authors: ["Anquandah, J.", "Barrieu, P."],
    year: 2019,
    journal: "Risks",
    volume: "7",
    pages: "94",
    doi: "10.3390/risks7030094",
    link: "https://www.mdpi.com/2227-9091/7/3/94",
    abstract: "An academic paper analyzing the timing of claims in unemployment insurance through stochastic optimal stopping and utility modeling. Provides theoretical framework for insurance decision-making under uncertainty.",
    researchArea: ["Labour"],
    method: ["Statistical Modelling"],
    keywords: ["Unemployment Insurance", "Optimal Stopping", "Utility Theory", "Stochastic Processes"],
    openAccess: true,
  },
];

const researchAreas = ["All", "Health", "Education", "Labour", "Youth"];
const methods = ["All", "RCT", "Statistical Modelling", "Machine Learning"];
const years = ["All", ...Array.from(new Set(allPublications.map(p => p.year))).sort((a, b) => b - a)];

export default function PublicationsPage() {
  const currentSEO = SEO.find((item) => item.page === "publications");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string | number>("All");

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return allPublications.filter((pub) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());

      // Area filter
      const matchesArea = selectedArea === "All" || pub.researchArea.includes(selectedArea);

      // Method filter
      const matchesMethod = selectedMethod === "All" || pub.method.includes(selectedMethod);

      // Year filter
      const matchesYear = selectedYear === "All" || pub.year === selectedYear;

      return matchesSearch && matchesArea && matchesMethod && matchesYear;
    });
  }, [searchQuery, selectedArea, selectedMethod, selectedYear]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedArea("All");
    setSelectedMethod("All");
    setSelectedYear("All");
  };

export default async function Page() {
  const videos = await getVideos();
  return <publicationui initialVideos={videos} />;
}
