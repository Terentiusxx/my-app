 "use client"
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Article {
  date: string;
  title: string;
  description: string;
  keywords: string[];
  link: string;
}

const articles: Article[] = [
  {
    date: "1 Apr 2025",
    title: "The Psychosocial Outcomes Following Cosmetic Surgery Are Largely Unknown: A Systematic Review",
    description: "A systematic review assessing the highest-quality evidence on how cosmetic surgery affects body image, self-esteem, and mental health.",
    keywords: ["Cosmetic Surgery", "Mental Health", "Self-Esteem", "Psychosocial Outcomes"],
    link: "https://www.jprasurg.com/article/S1748-6815(25)00181-0/fulltext",
  },
  {
    date: "1 Mar 2025",
    title: "My Body Is Amazing from the Bottom to the Top: An RCT Study Testing Two Positive Body Image Media Micro-Interventions for Young Children",
    description: "A randomized controlled trial exploring two short media-based interventions designed to foster positive body image in children aged 4–6.",
    keywords: ["Body Image", "Children", "Media Intervention", "RCT"],
    link: "https://www.sciencedirect.com/science/article/pii/S1740144525000026",
  },
  {
    date: "1 Sep 2024",
    title: "Changes in Attitudes Towards Telemedicine in Acute Burn Care Following the Covid-19 Pandemic",
    description: "A comparative study of clinicians' perceptions of telemedicine barriers and enablers for burn care before and after the Covid-19 pandemic.",
    keywords: ["Telemedicine", "Burn Care", "Covid-19", "Healthcare Technology"],
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0305417924001505",
  },
  {
    date: "1 Dec 2022",
    title: "Achieving the Health and Well-being SDGs Among Adolescent Mothers and Their Children in South Africa",
    description: "A cross-sectional analysis of SDG progress among adolescent mothers and their children in an HIV-endemic South African district.",
    keywords: ["SDGs", "Adolescent Health", "HIV", "South Africa", "Mother and Child"],
    link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0278163",
  },
  {
    date: "1 Dec 2020",
    title: "Optimal Stopping for Actuarial Use: A Study on Unemployment Insurance Schemes",
    description: "A doctoral thesis examining entry strategies into unemployment insurance using stochastic models and real labor force data from the UK.",
    keywords: ["Optimal Stopping", "Unemployment", "Actuarial Science", "Labor Data"],
    link: "https://etheses.whiterose.ac.uk/id/eprint/28075/",
  },
  {
    date: "1 Jan 2019",
    title: "Optimal Stopping and Utility in a Simple Model of Unemployment Insurance",
    description: "An academic paper analyzing the timing of claims in unemployment insurance through stochastic optimal stopping and utility modeling.",
    keywords: ["Unemployment Insurance", "Optimal Stopping", "Utility Theory"],
    link: "https://www.mdpi.com/journal/risks/special_issues/Stochastic_Optimal_Control",
  },
];

const LatestResearch: React.FC = () => {
  return (
    <section className="w-full px-8 md:px-16 py-20 bg-white">
      {/* Header */}
      <div className="mb-16">
        <div className="flex justify-between items-start mb-12">
          <motion.p 
            className="text-xs uppercase tracking-[0.3em] text-gray-500"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            LATEST RESEARCH
          </motion.p>
        </div>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:border-red-600 hover:shadow-xl transition-all duration-300 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Date badge */}
            <div className="text-xs text-red-600 font-medium mb-3">
              {article.date}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-3">
              {article.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
              {article.description}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.keywords.slice(0, 3).map((keyword, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Read more link */}
            <div className="flex items-center text-sm text-red-600 font-medium group-hover:gap-2 transition-all">
              Read paper
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View All Button */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full border-2 border-gray-900 hover:border-red-600 hover:bg-transparent hover:text-red-600 text-gray-900"
          onClick={() => window.location.href = '/publications'}
        >
          View All Research
        </Button>
      </motion.div>
    </section>
  );
};

export default LatestResearch;