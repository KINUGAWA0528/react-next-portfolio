"use client";

import { useState } from "react";
import WorksList from "../WorksList";
import DraggableWindow from "../DraggableWindow";
import { Works } from "@/app/_libs/microcms";
import styles from "./index.module.css";

export default function WorksSection({ works }: { works: Works[] }) {
  const [selectedWork, setSelectedWork] = useState<Works | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleSelect = (work: Works, pos: { x: number; y: number }) => {
    setSelectedWork(work);
    setPosition(pos);
  };

  return (
    <>
      <WorksList works={works} onSelect={handleSelect} />
      {selectedWork && (
        <DraggableWindow
          title={selectedWork.title}
          onClose={() => setSelectedWork(null)}
          defaultPosition={position}
          style={{ top: 0, left: 0, width: "600px", maxWidth: "90vw" }}
        >
          <div className={styles.workContent}>
            <div
              dangerouslySetInnerHTML={{ __html: selectedWork.content || "" }}
            />
          </div>
        </DraggableWindow>
      )}
    </>
  );
}
