import { Section } from "../../components/Section";
import { AvatarPose } from "../../components/avatar/AvatarPose";
import { PitchContour } from "../../components/PitchContour";
import { ProjectLinks } from "../../components/ProjectLinks";

export function VocalCoach() {
  return (
    <Section id="vocal-coach" wide>
      <div className="flex items-center gap-3">
        <AvatarPose pose="headphones" className="h-14 w-auto shrink-0" />
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">AI Vocal Coach</h2>
      </div>
      <p className="mt-3 max-w-lg font-body text-ink/75">
        Singers can't always hear their own pitch drift in real time. I built a coach that
        listens, scores, and tells you exactly where, comparing a sung take against a
        reference with pYIN pitch tracking and dynamic time warping, then having Claude
        turn the numbers into feedback that reads like a teacher, not a spec sheet.
      </p>
      <p className="mt-4 font-body text-xs uppercase tracking-wide text-ink/40">
        React · FastAPI · librosa · pYIN · DTW · Claude API
      </p>
      <ProjectLinks repo="#" />

      <div className="card mt-10 rounded-2xl p-6">
        <p className="mb-3 font-body text-xs text-ink/50">sung take vs. reference, DTW-aligned</p>
        <PitchContour className="h-24 w-full" />
        <div className="mt-2 flex gap-5 font-body text-xs text-ink/50">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-accent" /> sung
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-line" /> reference
          </span>
        </div>
      </div>
    </Section>
  );
}
