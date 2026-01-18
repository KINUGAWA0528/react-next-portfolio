import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  color?: "primary" | "event";
};

export default function ButtonLink({
  href,
  children,
  color = "primary",
}: Props) {
  const className =
    color === "event" ? `${styles.button} ${styles.event}` : styles.button;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
