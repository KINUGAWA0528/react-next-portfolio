"use client";

import React, { useRef, useState, useEffect } from "react";
import DraggableWindow from "../DraggableWindow";

const WindowItem = ({
  defaultPosition,
  children,
  width = "280px",
  height = "200px",
}: {
  defaultPosition: { x: number; y: number };
  children?: React.ReactNode;
  width?: string;
  height?: string;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [bgPos, setBgPos] = useState("0px 0px");

  const updateBgPosition = () => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setBgPos(`${-rect.left}px ${-rect.top}px`);
    }
  };

  useEffect(() => {
    updateBgPosition();
    window.addEventListener("resize", updateBgPosition);
    return () => window.removeEventListener("resize", updateBgPosition);
  }, []);

  return (
    <DraggableWindow
      title=""
      ref={windowRef}
      defaultPosition={defaultPosition}
      onDrag={updateBgPosition}
      style={{ width }}
    >
      <div
        style={{
          width: "100%",
          height: height,
          backgroundImage: "url('/nekomata.png')",
          backgroundPosition: bgPos,
          backgroundSize: "100vw auto",
          backgroundRepeat: "no-repeat",
          // border: "1px solid #333", // DraggableWindow already has border? Let's check.
          // DraggableWindow has border.
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {children}
      </div>
    </DraggableWindow>
  );
};

export default function Windows() {
  return (
    <>
      {/* System Info */}
      <WindowItem
        defaultPosition={{ x: 50, y: 50 }}
        width="300px"
        height="300px"
      />

      {/* Welcome */}
      <WindowItem
        defaultPosition={{ x: 400, y: 100 }}
        width="400px"
        height="250px"
      />

      {/* Profile */}
      <WindowItem
        defaultPosition={{ x: 100, y: 400 }}
        width="250px"
        height="350px"
      />

      {/* Photo */}
      <WindowItem
        defaultPosition={{ x: 500, y: 400 }}
        width="350px"
        height="250px"
      />
    </>
  );
}
