import Image from "next/image";
import commonStyles from "../pages.module.css";
import styles from "./page.module.css";

export default function Page() {
  return (
    <section className={commonStyles.section}>
      <h2 className={commonStyles.sectionTitle}>PROFILE</h2>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <h2 className={styles.name}>衣川 颯希</h2>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>自己紹介</h3>
          <p className={styles.content}>
            はじめまして。ポートフォリオをご覧いただきありがとうございます。
            <br />
            私は京都デザイン&テクノロジー専門学校でプログラミングを学んでいます。このサイトも授業の一環として制作しました。
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>経歴</h3>
          <dl className={styles.dl}>
            <dt className={styles.dt}>2025年 4月</dt>
            <dd className={styles.dd}>京都デザイン&テクノロジー専門学校 入学</dd>
          </dl>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>スキル</h3>
          <p className={styles.content}>
           python / HTML / CSS / JavaScript / TypeScript / React / Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
