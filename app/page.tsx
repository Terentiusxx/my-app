// app/page.tsx
import Hero from "@/components/Home/Hero";
import MediaSlider from "@/components/Home/mediaslider";
import Horizontal from "@/components/Home/Horizontal";
import Publications from "@/components/Home/Publications";
import Divider from "@/components/layout/Divider";
import Content from "@/components/Home/Content";
import Testimonials from "@/components/Home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Divider width="xl" />
      <MediaSlider />
      <Divider width="xl" />
      <Horizontal />
      <Publications />
      <Divider width="xl" />
      <Testimonials />
    </>
  );
}
