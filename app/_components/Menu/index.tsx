"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  // パスが一致するか判定するヘルパー
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link
              href="/"
              className={cx(styles.link, isActive("/") && styles.active)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={cx(styles.link, isActive("/profile") && styles.active)}
            >
              PROFILE
            </Link>
          </li>
          <li>
            <Link
              href="/works"
              className={cx(styles.link, isActive("/works") && styles.active)}
            >
              WORKS
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={cx(styles.link, isActive("/blog") && styles.active)}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={cx(styles.link, isActive("/contact") && styles.active)}
            >
              CONTACT
            </Link>
          </li>
        </ul>
        <button className={cx(styles.button, styles.close)} onClick={close}>
          <Image
            src="/close.svg"
            alt="閉じる"
            width={24}
            height={24}
            priority
          />
        </button>
      </nav>
      <button className={styles.button} onClick={open}>
        <Image src="/menu.svg" alt="メニュー" width={24} height={24} />
      </button>
    </div>
  );
}
