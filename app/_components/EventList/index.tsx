"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { Event } from "@/app/_libs/microcms";

type Props = {
  events: Event[];
};

export default function EventList({ events }: Props) {
  if (events.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul>
      {events.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link href={`/events/${article.id}`} className={styles.link}>
            {article.thumbnail ? (
              <Image
                src={article.thumbnail.url}
                alt=""
                className={styles.image}
                width={article.thumbnail.width}
                height={article.thumbnail.height}
              />
            ) : (
              <Image
                className={styles.image}
                src="/no-image.png"
                alt="No Image"
                width={1200}
                height={630}
              />
            )}
            <div className={styles.content}>
              <h3 className={styles.title}>{article.title}</h3>
              <dl className={styles.meta}>
                <dt>
                  <Category category={article.category} />
                </dt>
                <dd>
                  <Date date={article.publishedAt ?? article.createdAt} />
                </dd>
              </dl>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
