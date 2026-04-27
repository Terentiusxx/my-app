"use client";

import { useState } from "react";
import { SurveyEvidence } from "@/lib/types";

interface Props {
  surveyEvidence: SurveyEvidence[];
}

export function CohortEvidencePanel({ surveyEvidence }: Props) {
  const [index, setIndex] = useState(0);

  if (!surveyEvidence.length) return null;

  const active = surveyEvidence[index];

  const metrics = Array.isArray(active.metricsJson)
  ? active.metricsJson.slice(0, 4)
  : (
      (active.metricsJson as unknown as {
        highlights?: { label: string; value: string }[];
      })?.highlights ?? []
    ).slice(0, 4);
  
  const comments = Array.isArray(active.selectedCommentsJson)
  ? active.selectedCommentsJson.slice(0, 2)
  : [];

  const next = () =>
    setIndex((prev) => (prev + 1) % surveyEvidence.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? surveyEvidence.length - 1 : prev - 1
    );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">

      {/* TOP HEADER */}
          <div className="text-black p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">
              Cohort Insights
            </p>

            <h3 className="text-lg font-semibold leading-snug">
              {active.title}
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              {active.respondentCount} Responses
            </p>
          </div>

      {/* BODY */}
      <div className="p-5">

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {surveyEvidence.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              className={`px-2.5 py-1 text-[10px] rounded-full border transition ${
                i === index
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {item.cohortLabel || `Group ${i + 1}`}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
        {metrics.map((metric, i) => {
          const value = Number(metric.value);
          const outOf = "outOf" in metric ? Number(metric.outOf) : 10;
          const percent = Math.round((value / outOf) * 100);

          return (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">
                  {metric.label}
                </span>

                <span className="font-medium text-gray-900">
                  {percent}%
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

        {/* COMMENTS */}
        <div className="space-y-3 mb-6">
          {comments.map((comment, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-300 bg-gray-50 p-3"
            >
              <p className="text-sm italic text-gray-600 leading-relaxed">
                “{comment}”
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={prev}
            className="text-xs text-gray-500 hover:text-black"
          >
            ← Prev
          </button>

          <span className="text-xs text-gray-400">
            {index + 1}/{surveyEvidence.length}
          </span>

          <button
            onClick={next}
            className="text-xs text-gray-500 hover:text-black"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}