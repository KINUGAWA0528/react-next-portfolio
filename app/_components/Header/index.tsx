"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Menu from "../Menu";
import Draggable from "react-draggable";
import { useRef } from "react";

export default function Header() {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle={`.${styles.bar}`}>
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
        </div>
      </header>
    </Draggable>
  );
}
