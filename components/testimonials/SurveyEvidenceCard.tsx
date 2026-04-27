import { SurveyEvidence } from "@/lib/types";

interface Props {
  evidence: SurveyEvidence;
}

// Colour slots for metric tiles — cycles if there are more than 4
const TILE_COLOURS = [
  "bg-red-50 text-red-800 border-red-100",
  "bg-blue-50 text-blue-800 border-blue-100",
  "bg-green-50 text-green-800 border-green-100",
  "bg-purple-50 text-purple-800 border-purple-100",
] as const;

export function SurveyEvidenceCard({ evidence }: Props) {
  return (
    <article className="rounded-xl border border-gray-200 p-5 hover:border-red-200 hover:shadow-sm transition-all duration-200">
      {/* Header */}
      <header className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-gray-900 leading-snug">{evidence.title}</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap flex-shrink-0 font-medium">
            {evidence.respondentCount} respondents
          </span>
        </div>

        {(evidence.institution || evidence.cohortLabel) && (
          <p className="text-xs text-gray-500">
            {[evidence.institution, evidence.cohortLabel].filter(Boolean).join(" · ")}
          </p>
        )}
      </header>

      {/* Metric highlights */}
      {evidence.metricsJson.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {evidence.metricsJson.slice(0, 4).map((metric, i) => (
            <div
              key={i}
              className={`rounded-lg border p-3 ${TILE_COLOURS[i % TILE_COLOURS.length]}`}
            >
              <div className="text-base font-bold leading-none mb-1">{metric.value}</div>
              <div className="text-[11px] leading-tight opacity-75">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Selected comments */}
      {evidence.selectedCommentsJson && evidence.selectedCommentsJson.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            Student comments
          </p>
          {evidence.selectedCommentsJson.slice(0, 2).map((comment, i) => (
            <blockquote
              key={i}
              className="text-xs text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-200 italic"
            >
              "{comment}"
            </blockquote>
          ))}
        </div>
      )}
    </article>
  );
}
