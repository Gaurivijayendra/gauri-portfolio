export type PedalIconId =
  | "micro-frontends"
  | "responsive"
  | "rest-api"
  | "release-tag"
  | "key"
  | "shield-check"
  | "flask"
  | "clipboard-check";

export interface Pedal {
  name: string;
  note: string;
  /** Simple Icons slug (https://simpleicons.org) for the tech logo. Omit if none exists. */
  logo?: string;
  /** Hand-drawn line icon for skills that aren't a real product/brand (used only when `logo` is omitted). */
  icon?: PedalIconId;
}

export interface PedalGroup {
  stage: string;
  label: string;
  pedals: Pedal[];
}

export const PEDAL_BOARD: PedalGroup[] = [
  {
    stage: "languages",
    label: "Languages",
    pedals: [
      { name: "JavaScript (ES6+)", logo: "javascript", note: "Core language across React, Angular, and Vue work at IDC" },
      { name: "TypeScript", logo: "typescript", note: "Every production interface at IDC, plus every side project" },
      { name: "Python", logo: "python", note: "FastAPI backends for AI Vocal Coach and JobFitIQ" },
      { name: "HTML5", logo: "html5", note: "Semantic markup under every interface I've shipped" },
      { name: "CSS3", logo: "css", note: "Hand-placed layout and responsive rules on this site" },
    ],
  },
  {
    stage: "frontend",
    label: "Frontend",
    pedals: [
      { name: "React", logo: "react", note: "Project Helix's micro-frontend shell; Jest + RTL for coverage" },
      { name: "Angular", logo: "angular", note: "IDC Variant Coding: SSO, RBAC, 95%+ Jasmine/Karma coverage" },
      { name: "Vue.js", logo: "vuedotjs", note: "Project Helix, shared component shell across teams" },
      { name: "Tailwind CSS", logo: "tailwindcss", note: "Wavelength's design system, and this site" },
      { name: "Framer Motion", logo: "framer", note: "Every micro-interaction on this site" },
      { name: "Micro-Frontends", icon: "micro-frontends", note: "Project Helix: independently shipped, one shell" },
      { name: "Webpack Module Federation", logo: "webpack", note: "Micro-frontends at IDC, no monorepo" },
      { name: "Responsive Design", icon: "responsive", note: "Every screen in this portfolio, checked by hand" },
    ],
  },
  {
    stage: "backend",
    label: "Backend & Data",
    pedals: [
      { name: "FastAPI", logo: "fastapi", note: "Serving AI Vocal Coach and JobFitIQ" },
      { name: "REST APIs", icon: "rest-api", note: "Wired frontend to backend across every IDC release" },
      { name: "PostgreSQL", logo: "postgresql", note: "Data layer behind FastAPI side projects" },
      { name: "TF-IDF / Sentence-Transformers", logo: "huggingface", note: "Semantic matching in JobFitIQ's resume-JD scorer" },
      { name: "Claude API / LLM Integration", logo: "claude", note: "Coaching feedback in AI Vocal Coach, real-time bullet suggestions in JobFitIQ" },
    ],
  },
  {
    stage: "devops",
    label: "DevOps",
    pedals: [
      { name: "Kubernetes", logo: "kubernetes", note: "Deploying MBRDI's micro-frontend test platform" },
      { name: "Docker", logo: "docker", note: "Containerizing FastAPI services for AI Vocal Coach and JobFitIQ" },
      { name: "GitLab CI/CD", logo: "gitlab", note: "IDC's pipelines, gated on 95%+ test coverage" },
      { name: "Git", logo: "git", note: "Trunk-based flow across IDC's cross-functional team" },
      { name: "Release Management", icon: "release-tag", note: "Production releases across Agile sprints, planning to deploy" },
    ],
  },
  {
    stage: "security",
    label: "Security",
    pedals: [
      { name: "SSO", icon: "key", note: "Authenticated access for internal users at MBRDI" },
      { name: "Role-Based Access Control (RBAC)", icon: "shield-check", note: "Permission tiers across the variant-coding platform" },
    ],
  },
  {
    stage: "testing",
    label: "Testing",
    pedals: [
      { name: "Jest", logo: "jest", note: "Unit coverage for Project Helix's React components" },
      { name: "React Testing Library", logo: "testinglibrary", note: "Cut UI-related production bugs at IDC" },
      { name: "Karma", icon: "flask", note: "Angular unit tests for IDC's variant-coding platform" },
      { name: "Jasmine", logo: "jasmine", note: "95%+ coverage on the variant-coding platform" },
      { name: "Angular TestBed", icon: "clipboard-check", note: "Component-level testing for the Angular side of IDC" },
    ],
  },
];
