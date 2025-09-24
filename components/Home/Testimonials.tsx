"use client";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <blockquote className="border-l-2 border-black/10 pl-5">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed">“Jason’s classes are the reason I fell in love with computer science. He blends rigor with real care for students.”</p>
            <footer className="mt-3 text-sm md:text-base text-gray-500">— Former Student</footer>
          </blockquote>
          <blockquote className="border-l-2 border-black/10 pl-5">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed">“A rare educator who meets learners where they are and elevates them beyond what they thought possible.”</p>
            <footer className="mt-3 text-sm md:text-base text-gray-500">— Parent</footer>
          </blockquote>
          <blockquote className="border-l-2 border-black/10 pl-5">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed">“Collaborating with Jason pushed our program forward—thoughtful, data-driven, and deeply student-centered.”</p>
            <footer className="mt-3 text-sm md:text-base text-gray-500">— Colleague</footer>
          </blockquote>
          <blockquote className="border-l-2 border-black/10 pl-5">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed">“He brings contagious energy and clarity. My child went from hesitant to confident in one semester.”</p>
            <footer className="mt-3 text-sm md:text-base text-gray-500">— Parent</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
