"use client";

import { usePuzzle } from "@/app/_context/PuzzleContext";
import styles from "@/app/pages.module.css";
import { useEffect, useState } from "react";

export default function HomeTitle() {
  const { isCompleted } = usePuzzle();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowAnimation(true);
    }
  }, [isCompleted]);

  return (
    <section className={styles.top}>
      <div className={styles.content}>
        <h1
          className={styles.title}
          style={{
            color: isCompleted ? "#4ade80" : "#fff",
            transition: "color 0.5s ease",
            textShadow: isCompleted
              ? "0 0 20px rgba(74, 222, 128, 0.8)"
              : "none",
          }}
        >
          {isCompleted ? "SYSTEM UNLOCKED" : "PORTFOLIO"}
        </h1>
        <p
          className={styles.description}
          style={{
            color: isCompleted ? "#4ade80" : "#fff",
            transition: "color 0.5s ease",
          }}
        >
          {isCompleted ? "Welcome, Administrator." : "Design & Technology"}
        </p>
      </div>
    </section>
  );
}
