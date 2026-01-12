// app/page.tsx
import Hero from "@/components/Home/Hero";
import WhatIDo from "@/components/Home/WhatIDo";
import MediaSlider from "@/components/Home/mediaslider";
// import Horizontal from "@/components/Home/Horizontal";
// import Publications from "@/components/Home/Publications";
import Divider from "@/components/layout/Divider";
import Content from "@/components/Home/Content";
import Testimonials from "@/components/Home/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch";
import LatestResearch from "@/components/Home/LatestResearch";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <MediaSlider />
      <LatestResearch />
      <Testimonials />
      <GetInTouch />
    </>
  );
}
