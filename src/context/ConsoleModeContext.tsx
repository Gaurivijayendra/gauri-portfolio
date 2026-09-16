import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ConsoleModeState {
  consoleMode: boolean;
  setConsoleMode: (value: boolean) => void;
}

const ConsoleModeContext = createContext<ConsoleModeState | null>(null);

export function ConsoleModeProvider({ children }: { children: ReactNode }) {
  const [consoleMode, setConsoleMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("console-mode", consoleMode);
  }, [consoleMode]);

  return (
    <ConsoleModeContext.Provider value={{ consoleMode, setConsoleMode }}>
      {children}
    </ConsoleModeContext.Provider>
  );
}

export function useConsoleMode() {
  const ctx = useContext(ConsoleModeContext);
  if (!ctx) throw new Error("useConsoleMode must be used within ConsoleModeProvider");
  return ctx;
}
