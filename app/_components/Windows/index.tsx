"use client";

import React, { useRef, useState, useEffect } from "react";
import DraggableWindow from "../DraggableWindow";
import { DraggableEventHandler } from "react-draggable";
import { usePuzzle } from "@/app/_context/PuzzleContext";

const WindowItem = ({
  children,
  width = "280px",
  height = "200px",
  style,
  onStop,
}: {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  onStop?: DraggableEventHandler;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  return (
    <DraggableWindow
      title=""
      ref={windowRef}
      defaultPosition={{ x: 0, y: 0 }}
      onStop={onStop}
      style={{
        width,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(5px)",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: height,
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
  const { setIsCompleted } = usePuzzle();
  const [correctlyPlaced, setCorrectlyPlaced] = useState<
    Record<string, boolean>
  >({
    system: false,
    welcome: false,
    profile: false,
    photo: false,
  });

  useEffect(() => {
    const allCorrect = Object.values(correctlyPlaced).every((v) => v);
    setIsCompleted(allCorrect);
  }, [correctlyPlaced, setIsCompleted]);

  const checkPosition = (id: string, x: number, y: number) => {
    // Basic quadrant check relative to center start
    // Top-Left: x < -50, y < -50
    // Top-Right: x > 50, y < -50
    // Bottom-Left: x < -50, y > 50
    // Bottom-Right: x > 50, y > 50

    let isCorrect = false;
    const threshold = 50;

    switch (id) {
      case "system": // Top-Left
        isCorrect = x < -threshold && y < -threshold;
        break;
      case "welcome": // Top-Right
        isCorrect = x > threshold && y < -threshold;
        break;
      case "profile": // Bottom-Left
        isCorrect = x < -threshold && y > threshold;
        break;
      case "photo": // Bottom-Right
        isCorrect = x > threshold && y > threshold;
        break;
    }

    setCorrectlyPlaced((prev) => ({ ...prev, [id]: isCorrect }));
  };

  const centerStyle: React.CSSProperties = { top: "35%", left: "35%" };

  const getStatusStyle = (id: string, baseColor: string) => ({
    color: correctlyPlaced[id] ? "#4ade80" : baseColor,
    transition: "color 0.3s ease",
  });

  return (
    <>
      {/* System Info - Target: Top Left */}
      <WindowItem
        width="300px"
        height="200px"
        style={centerStyle}
        onStop={(e, data) => checkPosition("system", data.x, data.y)}
      >
        <div
          style={{ padding: "20px", color: "#fff", fontFamily: "monospace" }}
        >
          <h3
            style={{
              marginBottom: "10px",
              borderBottom: `1px solid ${correctlyPlaced.system ? "#4ade80" : "#fff"}`,
              transition: "border-color 0.3s",
            }}
          >
            SYSTEM {correctlyPlaced.system && "✓"}
          </h3>
          <p style={getStatusStyle("system", "#fff")}>
            Target: Top-Left Sector
          </p>
          <p>Status: {correctlyPlaced.system ? "LOCKED" : "Drifting"}</p>
        </div>
      </WindowItem>

      {/* Welcome - Target: Top Right */}
      <WindowItem
        width="400px"
        height="250px"
        style={centerStyle}
        onStop={(e, data) => checkPosition("welcome", data.x, data.y)}
      >
        <div style={{ padding: "20px", color: "#fff" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "10px",
              ...getStatusStyle("welcome", "#fff"),
            }}
          >
            Welcome {correctlyPlaced.welcome && "✓"}
          </h2>
          <p>Drag me to Top-Right!</p>
        </div>
      </WindowItem>

      {/* Profile - Target: Bottom Left */}
      <WindowItem
        width="250px"
        height="350px"
        style={centerStyle}
        onStop={(e, data) => checkPosition("profile", data.x, data.y)}
      >
        <div style={{ padding: "20px", color: "#fff" }}>
          <h3 style={getStatusStyle("profile", "#fff")}>
            Profile {correctlyPlaced.profile && "✓"}
          </h3>
          <p>Target: Bottom-Left</p>
          <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
            <li>Works</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
      </WindowItem>

      {/* Photo - Target: Bottom Right */}
      <WindowItem
        width="350px"
        height="250px"
        style={centerStyle}
        onStop={(e, data) => checkPosition("photo", data.x, data.y)}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: correctlyPlaced.photo
              ? "rgba(74, 222, 128, 0.1)"
              : "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: correctlyPlaced.photo ? "#4ade80" : "rgba(255,255,255,0.5)",
            transition: "all 0.3s",
          }}
        >
          {correctlyPlaced.photo ? "PHOTO LOCKED" : "Target: Bottom-Right"}
        </div>
      </WindowItem>
    </>
  );
}
