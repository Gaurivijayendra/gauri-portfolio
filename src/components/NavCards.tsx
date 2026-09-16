import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NavCard {
  to: string;
  title: string;
  blurb: string;
}

const CARDS: NavCard[] = [
  {
    to: "/tech-stack",
    title: "Tech stack",
    blurb: "The toolkit: React, FastAPI, Kubernetes, and everything between.",
  },
  {
    to: "/projects",
    title: "Things I've shipped",
    blurb: "Three projects where engineering met a good ear.",
  },
];

export function NavCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.to}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Link
            to={c.to}
            className="card group flex h-full flex-col justify-between rounded-2xl p-6 transition-colors hover:border-accent/50"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 font-body text-sm text-ink/60">{c.blurb}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 font-body text-sm text-accent">
              Take a look
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
