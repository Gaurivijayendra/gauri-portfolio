export interface PaletteCommand {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Projects" | "Actions";
  keywords?: string;
}

export const EMAIL = "gaurivij24@gmail.com";
export const WAVELENGTH_URL = "https://wavelength-music-dashboard.vercel.app";
export const JOBFITIQ_URL = "https://jobfitiq-resume-jd-matcher.vercel.app";

export const COMMANDS: PaletteCommand[] = [
  { id: "nav-hero", label: "Go to Hero", group: "Navigate", keywords: "top home start" },
  { id: "nav-about", label: "Go to About", group: "Navigate", keywords: "dual identity bio" },
  { id: "nav-stack", label: "Go to Tech Stack", group: "Navigate", keywords: "pedalboard tools skills" },
  { id: "nav-vocal-coach", label: "Go to AI Vocal Coach", group: "Navigate", keywords: "project pitch singing" },
  { id: "nav-wavelength", label: "Go to Wavelength", group: "Navigate", keywords: "project music dashboard" },
  { id: "nav-jobfitiq", label: "Go to JobFitIQ", group: "Navigate", keywords: "project resume matcher" },
  { id: "nav-contact", label: "Go to Contact", group: "Navigate", keywords: "footer email" },
  { id: "open-wavelength", label: "Open Wavelength (live)", group: "Projects", hint: "wavelength-music-dashboard.vercel.app" },
  { id: "open-jobfitiq", label: "Open JobFitIQ (live)", group: "Projects", hint: "jobfitiq-resume-jd-matcher.vercel.app" },
  { id: "copy-email", label: "Copy email", group: "Actions", hint: EMAIL },
  { id: "open-resume", label: "Open résumé", group: "Actions", hint: "PDF" },
];
