"use client";

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import styles from "./index.module.css";
import { getNextZIndex } from "@/app/_libs/zIndexManager";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  defaultPosition?: { x: number; y: number };
  style?: React.CSSProperties;
  onDrag?: DraggableEventHandler;
  bounds?:
    | string
    | { left: number; top: number; right: number; bottom: number }
    | false;
  onMouseDown?: React.MouseEventHandler;
};

const DraggableWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      title = "WINDOW",
      children,
      onClose,
      defaultPosition,
      style,
      onDrag,
      bounds = "body",
      onMouseDown,
    },
    ref
  ) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [zIndex, setZIndex] = useState(1000);

    useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);

    const handleMouseDown = (e: any) => {
      setZIndex(getNextZIndex());
      if (onMouseDown) {
        onMouseDown(e);
      }
    };

    return (
      <Draggable
        nodeRef={nodeRef}
        handle={`.${styles.header}`}
        defaultPosition={defaultPosition}
        onDrag={onDrag}
        onMouseDown={handleMouseDown}
        bounds={bounds}
      >
        <div
          ref={nodeRef}
          className={styles.window}
          style={{ ...style, zIndex }}
          onMouseDownCapture={handleMouseDown}
        >
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </Draggable>
    );
  }
);

DraggableWindow.displayName = "DraggableWindow";

export default DraggableWindow;
