"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePuzzle } from "@/app/_context/PuzzleContext";

export default function ScrollLock() {
  const { isCompleted } = usePuzzle();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  if (pathname === "/" && !isCompleted) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999, // Covers header (9000) but below puzzle windows (start at 10000)
          cursor: "default",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    );
  }

  return null;
}
