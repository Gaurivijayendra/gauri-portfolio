export interface OtherProject {
  name: string;
  description: string;
  stack: string;
  repo: string;
}

/** Smaller, earlier builds from GitHub — not full case studies, just shipped and public. */
export const OTHER_PROJECTS: OtherProject[] = [
  {
    name: "BookedUp",
    description: "A booking-flow web app, built to practice real form state and routing beyond tutorial scope.",
    stack: "JavaScript · React",
    repo: "https://github.com/Gaurivijayendra/BookedUp",
  },
  {
    name: "ytclone",
    description: "A YouTube UI clone: video grid, layout, and responsive behavior rebuilt from scratch.",
    stack: "JavaScript · React",
    repo: "https://github.com/Gaurivijayendra/ytclone",
  },
  {
    name: "RandomAdvice",
    description: "A small React app that serves random advice on click — an early one, kept for the record.",
    stack: "React · CSS",
    repo: "https://github.com/Gaurivijayendra/RandomAdvice",
  },
];
