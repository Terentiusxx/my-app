import type { Metadata } from "next";
import { api } from "@/lib/api";
import { Testimonial, SurveyEvidence } from "@/lib/types";
import { TestimonialsShell } from "@/components/testimonials/TestimonialsShell";
import Copy from "@/components/Home/textanimate";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

export function generateMetadata(): Metadata {
  const currentSEO = SEO.find((item) => item.page === "testimonials");
  return {
    title: INFO.main.title,
    description: currentSEO?.description ?? "Testimonials about Dr. Jason Anquandah",
    keywords: currentSEO?.keywords?.join(", ") ?? "Dr. Jason, testimonials, teaching, feedback",
  };
}

export default async function TestimonialsPage() {
  // Parallel fetch — never waterfall
  const [testimonials, surveyEvidence] = await Promise.all([
    api<Testimonial[]>("/api/testimonials"),
    api<SurveyEvidence[]>("/api/surveyevidence"),
  ]);

  const featuredTestimonials = testimonials.filter((t) => t.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hero — identical to original */}
      <div
        className="relative h-[50vh] flex items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/students.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 flex flex-col justify-center items-center px-5">
          <Copy animateOnScroll={false} delay={0.3}>
            <h1 className="text-5xl font-bold mb-5 font-playfair">What Students Say</h1>
          </Copy>
          <Copy animateOnScroll={false} delay={0.5}>
            <p className="text-xl max-w-[700px] text-gray-100 leading-relaxed">
              Real reflections from those she&apos;s taught, mentored, and inspired.
            </p>
          </Copy>
        </div>
      </div>
      
      {/* Shell handles the overlay + two-column layout */}
      <TestimonialsShell
        testimonials={testimonials}
        featuredTestimonials={featuredTestimonials}
        surveyEvidence={surveyEvidence}
      />
    </div>
  );
}