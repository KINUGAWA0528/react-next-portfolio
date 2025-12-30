import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/">HOME</Link>
          </li>
          <li className={styles.item}>
            <Link href="/profile">PROFILE</Link>
          </li>
          <li className={styles.item}>
            <Link href="/works">WORKS</Link>
          </li>
          <li className={styles.item}>
            <Link href="/blog">BLOG</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© KINU 2025 </p>
    </footer>
  );
}
