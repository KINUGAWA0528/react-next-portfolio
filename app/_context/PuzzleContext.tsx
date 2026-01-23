"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PuzzleContextType = {
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
};

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export function PuzzleProvider({ children }: { children: ReactNode }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <PuzzleContext.Provider value={{ isCompleted, setIsCompleted }}>
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzle() {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error("usePuzzle must be used within a PuzzleProvider");
  }
  return context;
}
