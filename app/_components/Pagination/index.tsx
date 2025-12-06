import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
    totalCount: number;
};

export default function Pagination({ totalCount }: Props) {
    const pages = Array.from(
        { length: Math.ceil(totalCount / NEWS_LIST_LIMIT) },(_, i) => i + 1
    );

    return (
        <nav>
            <ul className={styles.container}>
                <li className={styles.list}
            </ul>
        </nav>
    )
}