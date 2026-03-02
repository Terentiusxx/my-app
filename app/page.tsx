import Hero from "@/components/Home/Hero";
import WhatIDo from "@/components/Home/WhatIDo";
import MediaSlider from "@/components/Home/mediaslider";
import Quote from "@/components/Home/Quote";
import Testimonials from "@/components/Home/Testimonials";
import GetInTouch from "@/components/Home/GetInTouch";
import LatestResearch from "@/components/Home/LatestResearch";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <LatestResearch />
      <Quote />
      <MediaSlider />
      <Testimonials />
      <GetInTouch />
    </>
  );
}
