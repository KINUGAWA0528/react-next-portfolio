"use client";

import Link from "next/link";

import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { Event } from "@/app/_libs/microcms";

type Props = {
  events: Event[];
  onSelect?: (event: Event, position: { x: number; y: number }) => void;
};

export default function EventList({ events, onSelect }: Props) {
  if (events.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul>
      {events.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link
            href={`/events/${article.id}`}
            className={styles.link}
            onClick={(e) => {
              if (onSelect) {
                e.preventDefault();
                onSelect(article, { x: e.pageX, y: e.pageY });
              }
            }}
          >
            <div className={styles.content}>
              <h3 className={styles.title}>{article.title}</h3>
              <dl className={styles.meta}>
                <dt>
                  <Category category={article.category} />
                </dt>
                <dd>
                  <Date
                    date={article.date ?? article.publishedAt ?? article.createdAt}
                  />
                </dd>
              </dl>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
