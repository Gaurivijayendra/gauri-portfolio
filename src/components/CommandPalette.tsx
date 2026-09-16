import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { COMMANDS, EMAIL, JOBFITIQ_URL, WAVELENGTH_URL } from "../lib/commands";
import { useConsoleMode } from "../context/ConsoleModeContext";
import { JumpBurst } from "./avatar/JumpBurst";

/** Each nav command's destination: a route, and optionally a section id to scroll to once there. */
const NAV_TARGETS: Record<string, { path: string; hash?: string }> = {
  "nav-hero": { path: "/", hash: "hero" },
  "nav-about": { path: "/", hash: "about" },
  "nav-stack": { path: "/tech-stack" },
  "nav-vocal-coach": { path: "/projects", hash: "vocal-coach" },
  "nav-wavelength": { path: "/projects", hash: "wavelength" },
  "nav-jobfitiq": { path: "/projects", hash: "jobfitiq" },
  "nav-contact": { path: "/", hash: "contact" },
};

const TERMINAL_LINES = [
  { cmd: "whoami", out: "frontend engineer. trained vocalist. probably humming mid-refactor." },
  { cmd: "stack --list", out: "react · typescript · fastapi · tailwind · framer-motion · kubernetes" },
  { cmd: "play", out: "♪ now playing: a pitch-perfect pull request ♪" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange: setOpen }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [terminal, setTerminal] = useState(false);
  const [copyKey, setCopyKey] = useState(0);
  const { setConsoleMode } = useConsoleMode();
  const navigate = useNavigate();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (search.trim().toLowerCase() === "console" && !terminal) {
      const t = window.setTimeout(() => {
        setTerminal(true);
        setConsoleMode(true);
      }, 380);
      return () => window.clearTimeout(t);
    }
  }, [search, terminal, setConsoleMode]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setTerminal(false);
      setConsoleMode(false);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    }
  }, [open, setConsoleMode]);

  function runCommand(id: string) {
    if (id in NAV_TARGETS) {
      const { path, hash } = NAV_TARGETS[id];
      navigate(hash ? `${path}#${hash}` : path);
      setOpen(false);
      return;
    }
    if (id === "open-wavelength") {
      window.open(WAVELENGTH_URL, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    if (id === "open-jobfitiq") {
      window.open(JOBFITIQ_URL, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    if (id === "open-resume") {
      window.open("/resume.pdf", "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    if (id === "copy-email") {
      navigator.clipboard.writeText(EMAIL).catch(() => {});
      setCopyKey((k) => k + 1);
      return;
    }
  }

  function exitTerminal() {
    setTerminal(false);
    setConsoleMode(false);
    setSearch("");
  }

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Command palette"
          shouldFilter={!terminal}
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
        >
          <motion.div
            className="fixed inset-0 -z-10 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`w-full max-w-xl overflow-hidden rounded-2xl border shadow-lift ${
              terminal
                ? "border-[#39ff6a]/40 bg-[#0d0f0c] font-console text-[10px] text-[#39ff6a]"
                : "glass"
            }`}
          >
            {!terminal ? (
              <>
                <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                  <span className="text-accent">⌘</span>
                  <Command.Input
                    autoFocus
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Jump somewhere, or type a command…"
                    className="flex-1 bg-transparent font-body text-sm text-ink placeholder:text-ink/40 outline-none"
                  />
                  {copyKey > 0 && (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      copied
                      <JumpBurst triggerKey={copyKey} className="h-8 w-8" />
                    </span>
                  )}
                </div>
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center text-sm text-ink/50">
                    No matches. Try "console".
                  </Command.Empty>
                  {(["Navigate", "Projects", "Actions"] as const).map((group) => (
                    <Command.Group
                      key={group}
                      heading={group}
                      className="px-1 py-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-ink/40"
                    >
                      {COMMANDS.filter((c) => c.group === group).map((c) => (
                        <Command.Item
                          key={c.id}
                          value={`${c.label} ${c.keywords ?? ""}`}
                          onSelect={() => runCommand(c.id)}
                          className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink data-[selected=true]:bg-accent/15"
                        >
                          <span>{c.label}</span>
                          {c.hint && <span className="text-xs text-ink/40">{c.hint}</span>}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>
              </>
            ) : (
              <div className="p-5">
                {TERMINAL_LINES.map((line, i) => (
                  <TerminalLine key={line.cmd} cmd={line.cmd} out={line.out} delay={i * 0.9} />
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: TERMINAL_LINES.length * 0.9 + 0.6 }}
                  className="mt-2 flex items-center gap-2"
                >
                  <span className="text-[#7fffa0]/70">type "exit" to return,</span>
                  <button onClick={exitTerminal} className="underline decoration-dotted underline-offset-2">
                    exit
                  </button>
                  <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-[#39ff6a]" />
                </motion.div>
              </div>
            )}
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}

function TerminalLine({ cmd, out, delay }: { cmd: string; out: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="mb-3 leading-relaxed"
    >
      <div className="text-[#39ff6a]">
        guest@gauri.dev:~$ <span className="text-[#8effb0]">{cmd}</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.35 }}
        className="mt-1 text-[#7fffa0]/80"
      >
        {"> "}
        {out}
      </motion.div>
    </motion.div>
  );
}
