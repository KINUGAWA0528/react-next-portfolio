import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li>
            <Link href="/profile">PROFILE</Link>
          </li>
          <li>
            <Link href="/works">WORKS</Link>
          </li>
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
          <li>
            <Link href="/events">EVENTS</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© KINU 2025 </p>
    </footer>
  );
}
