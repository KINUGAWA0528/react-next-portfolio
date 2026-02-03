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
  const { isCompleted, setIsCompleted } = usePuzzle();
  const [correctlyPlaced, setCorrectlyPlaced] = useState<
    Record<string, boolean>
  >({
    system: false,
    welcome: false,
    profile: false,
    photo: false,
  });

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
    if (isCompleted) {
      setCorrectlyPlaced({
        system: true,
        welcome: true,
        profile: true,
        photo: true,
      });
    }
  }, [isCompleted]);

  useEffect(() => {
    const allCorrect = Object.values(correctlyPlaced).every((v) => v);
    if (allCorrect) {
      setIsCompleted(true);
    }
  }, [correctlyPlaced, setIsCompleted]);

  const checkPosition = (id: string, x: number, y: number) => {
    // Basic quadrant check relative to center start
    // Top-Left: x < -20, y < -20
    // Top-Right: x > 20, y < -20
    // Bottom-Left: x < -20, y > 20
    // Bottom-Right: x > 20, y > 20

    let isCorrect = false;
    const threshold = 20;

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

  const systemStyle: React.CSSProperties = { top: "15%", left: "10%" };
  const welcomeStyle: React.CSSProperties = { top: "15%", left: "60%" };
  const profileStyle: React.CSSProperties = { top: "55%", left: "5%" };
  const photoStyle: React.CSSProperties = { top: "60%", left: "65%" };

  const getStatusStyle = (id: string, baseColor: string) => ({
    color: correctlyPlaced[id] ? "#4ade80" : baseColor,
    transition: "color 0.3s ease",
  });

  return (
    <>
      {/* System Info - Target: Top Left */}
      <WindowItem
        width={isMobile ? "120px" : "300px"}
        height={isMobile ? "100px" : "200px"}
        style={systemStyle}
        onStop={(e, data) => checkPosition("system", data.x, data.y)}
      >
        <div
          style={{ padding: isMobile ? "6px" : "20px", color: "#fff", fontFamily: "monospace", fontSize: isMobile ? "0.6rem" : "1rem" }}
        >
          <h3
            style={{
              marginBottom: "10px",
              borderBottom: `1px solid ${correctlyPlaced.system ? "#4ade80" : "#fff"}`,
              transition: "border-color 0.3s",
              fontSize: isMobile ? "0.65rem" : "1rem",
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
        width={isMobile ? "140px" : "400px"}
        height={isMobile ? "110px" : "250px"}
        style={welcomeStyle}
        onStop={(e, data) => checkPosition("welcome", data.x, data.y)}
      >
        <div style={{ padding: isMobile ? "6px" : "20px", color: "#fff" }}>
          <h2
            style={{
              fontSize: isMobile ? "0.85rem" : "2rem",
              marginBottom: "10px",
              ...getStatusStyle("welcome", "#fff"),
            }}
          >
            Welcome {correctlyPlaced.welcome && "✓"}
          </h2>
          <p style={{ fontSize: isMobile ? "0.6rem" : "1rem" }}>Drag me to Top-Right!</p>
        </div>
      </WindowItem>

      {/* Profile - Target: Bottom Left */}
      <WindowItem
        width={isMobile ? "110px" : "250px"}
        height={isMobile ? "110px" : "220px"}
        style={profileStyle}
        onStop={(e, data) => checkPosition("profile", data.x, data.y)}
      >
        <div style={{ padding: isMobile ? "6px" : "20px", color: "#fff", fontSize: isMobile ? "0.6rem" : "1rem" }}>
          <h3 style={{ ...getStatusStyle("profile", "#fff"), fontSize: isMobile ? "0.65rem" : "1rem" }}>
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
        width={isMobile ? "130px" : "350px"}
        height={isMobile ? "110px" : "250px"}
        style={photoStyle}
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
            fontSize: isMobile ? "0.6rem" : "1rem",
            padding: isMobile ? "4px" : "0",
          }}
        >
          {correctlyPlaced.photo ? "PHOTO LOCKED" : "Target: Bottom-Right"}
        </div>
      </WindowItem>
    </>
  );
}
