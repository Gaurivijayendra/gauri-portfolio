import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section } from "../components/Section";
import { BackLink } from "../components/BackLink";
import { SectionIntro } from "../components/SectionIntro";
import { VocalCoach } from "../sections/projects/VocalCoach";
import { Wavelength } from "../sections/projects/Wavelength";
import { JobFitIQ } from "../sections/projects/JobFitIQ";
import { OtherProjects } from "../sections/projects/OtherProjects";

export function ProjectsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Section id="projects-top" className="pb-0 pt-28" wide>
        <BackLink />
        <SectionIntro label="Things I've shipped" />
      </Section>
      <VocalCoach />
      <Wavelength />
      <JobFitIQ />
      <OtherProjects />
    </>
  );
}
