import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { AvatarPose } from "../components/avatar/AvatarPose";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 sm:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="card order-2 mx-auto w-full max-w-[220px] rounded-2xl p-4 sm:order-1"
        >
          <AvatarPose pose="study-vibes" className="h-auto w-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 sm:order-2"
        >
          <span className="mb-3 block h-1 w-12 rounded-full bg-accent" />
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">A little about me</h2>
          <p className="mt-4 max-w-xl font-body leading-relaxed text-ink/75">
            I've got a CS degree and two years at Mercedes-Benz R&amp;D India, now as a
            Graduate Apprentice, shipping the kind of software that doesn't forgive
            sloppy timing: Angular and React interfaces with SSO and RBAC, Kubernetes
            deployments, and GitLab pipelines gated on 95%+ test coverage. Before that, a
            Student Intern stint building micro-frontend UI for Project Helix.
          </p>

          <div className="mt-6 border-t border-line pt-4">
            <p className="font-body text-xs uppercase tracking-wide text-ink/40">Education</p>
            <p className="mt-1.5 font-body text-sm text-ink/75">
              B.E., Computer Science and Engineering — The National Institute of
              Engineering, Mysuru
            </p>
            <p className="mt-0.5 font-body text-xs text-ink/50">2020 – 2024 · CGPA 9.06/10.00</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
