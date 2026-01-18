import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <h2 className={styles.name}>Your Name</h2>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>自己紹介</h3>
        <p className={styles.content}>
          はじめまして。ポートフォリオをご覧いただきありがとうございます。
          <br />
          私はWebエンジニアとして活動しています。モダンなフロントエンド技術に関心があり、現在はこのポートフォリオサイトを通じて技術力の向上に励んでいます。
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>経歴</h3>
        <dl className={styles.dl}>
          <dt className={styles.dt}>2020年 3月</dt>
          <dd className={styles.dd}>〇〇大学 情報学部 卒業</dd>
          <dt className={styles.dt}>2020年 4月</dt>
          <dd className={styles.dd}>
            株式会社〇〇 入社。フロントエンドエンジニアとして従事。
          </dd>
          <dt className={styles.dt}>現在</dt>
          <dd className={styles.dd}>Webアプリケーション開発を中心に活動中。</dd>
        </dl>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>スキル</h3>
        <p className={styles.content}>
          HTML / CSS / JavaScript / TypeScript / React / Next.js
        </p>
      </div>
    </div>
  );
}
