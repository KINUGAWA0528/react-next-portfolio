"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function OpeningLoading() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // アニメーション完了後にフェードアウト
    const timer1 = setTimeout(() => {
      setIsVisible(false);
    }, 2200); // プログレスバーのアニメーション(2s) + 余韻

    // フェードアウト完了後にDOMから削除
    const timer2 = setTimeout(() => {
      setShouldRender(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.container} ${!isVisible ? styles.hidden : ""}`}>
      <div className={styles.content}>
        <div className={styles.text}>LOADING</div>
        <div className={styles.bar}>
          <div className={styles.progress}></div>
        </div>
      </div>
    </div>
  );
}
