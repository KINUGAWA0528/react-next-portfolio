"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type PuzzleContextType = {
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
  isOpeningCompleted: boolean;
  setIsOpeningCompleted: (completed: boolean) => void;
};

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export function PuzzleProvider({ children }: { children: ReactNode }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpeningCompleted, setIsOpeningCompleted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("puzzleCompleted");
    if (savedState === "true") {
      setIsCompleted(true);
    }
  }, []);

  // Save to localStorage when state changes
  const handleSetIsCompleted = (completed: boolean) => {
    setIsCompleted(completed);
    localStorage.setItem("puzzleCompleted", String(completed));
  };

  return (
    <PuzzleContext.Provider
      value={{
        isCompleted,
        setIsCompleted: handleSetIsCompleted,
        isOpeningCompleted,
        setIsOpeningCompleted,
      }}
    >
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
