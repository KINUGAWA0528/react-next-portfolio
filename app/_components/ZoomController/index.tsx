"use client";

import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.css";

export default function ZoomController() {
  const nodeRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(100);

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
    <Draggable nodeRef={nodeRef} handle={`.${styles.bar}`}>
      <div className={styles.container} ref={nodeRef}>
        <div className={styles.bar}>
          <span className={styles.title}>ZOOM</span>
        </div>
        <div className={styles.content}>
          <button
            className={styles.button}
            onClick={handleZoomOut}
            aria-label="縮小"
          >
            -
          </button>
          <span className={styles.value}>{zoomLevel}%</span>
          <button
            className={styles.button}
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
    </Draggable>
  );
}
