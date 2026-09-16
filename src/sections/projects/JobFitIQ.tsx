import { Section } from "../../components/Section";
import { AvatarPose } from "../../components/avatar/AvatarPose";
import { RadarChart } from "../../components/RadarChart";
import { ProjectLinks } from "../../components/ProjectLinks";
import { JOBFITIQ_URL } from "../../lib/commands";

export function JobFitIQ() {
  return (
    <Section id="jobfitiq" wide>
      <div className="flex items-center gap-3">
        <AvatarPose pose="pixel-work" variant="pixel" className="h-14 w-auto shrink-0" />
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">JobFitIQ</h2>
      </div>
      <p className="mt-3 max-w-lg font-body text-ink/75">
        Resumes and job descriptions rarely use the same words for the same skill.
        JobFitIQ scores the overlap with TF-IDF and sentence-transformer embeddings, then
        shows its work: an animated match score, inline keyword highlighting, and a radar
        chart of where you actually align.
      </p>

      <a
        href={JOBFITIQ_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="card group mt-6 block overflow-hidden rounded-2xl"
      >
        <div className="aspect-[16/8] overflow-hidden bg-surface">
          <img
            src="/screenshots/jobfitiq.png"
            alt="JobFitIQ interface with side-by-side resume and job description input panels"
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </a>

      <p className="mt-4 font-body text-xs uppercase tracking-wide text-ink/40">
        FastAPI · TF-IDF · sentence-transformers
      </p>
      <ProjectLinks live={JOBFITIQ_URL} repo="#" />

      <div className="card mt-6 flex flex-col items-center gap-4 rounded-2xl p-6 sm:flex-row sm:justify-center">
        <RadarChart className="h-40 w-40" />
        <p className="max-w-[220px] font-body text-xs text-ink/50">
          skill overlap between a real résumé and a real job description, matched, not
          guessed
        </p>
      </div>
    </Section>
  );
}
