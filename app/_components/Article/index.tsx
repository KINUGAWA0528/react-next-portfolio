import Link from "next/link";
import Image from "next/image";
import type { News, Blog, Works, Event } from "@/app/_libs/microcms";
import Date from "../Date";
import Category from "../Category";
import styles from "./index.module.css";

type Props = {
  data: News | Blog | Works | Event;
};

export default function Article({ data }: Props) {
  const thumbnail =
    (data as Blog).eyecatch ||
    (data as Works).body ||
    (data as News).thumbnail ||
    (data as Event).thumbnail;

  return (
    <main>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        <Category category={data.category} />
        <Date date={data.publishedAt ?? ""} />
      </div>
      {thumbnail && (
        <Image
          src={thumbnail.url}
          alt=""
          className={styles.thumbnail}
          width={thumbnail.width}
          height={thumbnail.height}
        />
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      />
    </main>
  );
}
