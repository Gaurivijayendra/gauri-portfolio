import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsoleModeProvider } from "./context/ConsoleModeContext";
import { StaffLine } from "./components/StaffLine";
import { ScrollWalker } from "./components/ScrollWalker";
import { CommandPalette } from "./components/CommandPalette";
import { CommandHint } from "./components/CommandHint";
import { HireMeButton } from "./components/HireMeButton";
import { CustomCursor } from "./components/CustomCursor";
import { Home } from "./pages/Home";
import { TechStackPage } from "./pages/TechStackPage";
import { ProjectsPage } from "./pages/ProjectsPage";

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <BrowserRouter>
      <ConsoleModeProvider>
        <div className="relative min-h-screen bg-canvas">
          <CustomCursor />
          <StaffLine />
          <ScrollWalker />
          <main className="relative z-[1]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tech-stack" element={<TechStackPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </main>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
          <CommandHint onClick={() => setPaletteOpen(true)} />
          <HireMeButton />
        </div>
      </ConsoleModeProvider>
    </BrowserRouter>
  );
}

export default App;
