import { Section } from "../components/Section";
import { BackLink } from "../components/BackLink";
import { TechStack } from "../sections/TechStack";

export function TechStackPage() {
  return (
    <>
      <Section id="tech-stack-top" className="pb-0 pt-28" wide>
        <BackLink />
      </Section>
      <TechStack />
    </>
  );
}
