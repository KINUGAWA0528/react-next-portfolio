"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Menu from "../Menu";
import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";

export default function Header() {
  const nodeRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    // 初回実行
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 初期設定
    document.documentElement.style.fontSize = `${zoomLevel}%`;
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(prev + 10, 200); // 最大200%
      document.documentElement.style.fontSize = `${next}%`;
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 10, 50); // 最小50%
      document.documentElement.style.fontSize = `${next}%`;
      return next;
    });
  };

  const handleReset = () => {
    setZoomLevel(100);
    document.documentElement.style.fontSize = "100%";
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={`.${styles.bar}`}
      disabled={isMobile}
    >
      <header className={styles.header} ref={nodeRef}>
        <div className={styles.bar}>
          <span className={styles.title}>Navigation</span>
          <div className={styles.controls}>
            <div className={styles.cross}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M1 11L11 1"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Menu />
          <div className={styles.divider} />
          <div className={styles.zoomControls}>
            <button
              className={styles.zoomButton}
              onClick={handleZoomOut}
              aria-label="縮小"
            >
              -
            </button>
            <span className={styles.zoomValue}>{zoomLevel}%</span>
            <button
              className={styles.zoomButton}
              onClick={handleZoomIn}
              aria-label="拡大"
            >
              +
            </button>
            <button
              className={styles.resetButton}
              onClick={handleReset}
              aria-label="リセット"
            >
              RESET
            </button>
          </div>
        </div>
      </header>
    </Draggable>
  );
}
