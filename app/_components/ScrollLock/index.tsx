"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePuzzle } from "@/app/_context/PuzzleContext";

export default function ScrollLock() {
  const { isCompleted } = usePuzzle();
  const pathname = usePathname();

  useEffect(() => {
    // Only lock scroll on the home page
    if (pathname === "/") {
      if (isCompleted) {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      } else {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    } else {
      // Always unlock on other pages
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // Cleanup on unmount or change
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isCompleted, pathname]);

  return null;
}
