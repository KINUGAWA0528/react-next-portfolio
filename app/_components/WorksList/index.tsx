"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { Works } from "@/app/_libs/microcms";

type Props = {
  works: Works[];
  onSelect?: (work: Works, position: { x: number; y: number }) => void;
};

export default function WorksList({ works, onSelect }: Props) {
  if (works.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul>
      {works.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link
            href={`/works/${article.id}`}
            className={styles.link}
            onClick={(e) => {
              if (onSelect) {
                e.preventDefault();
                onSelect(article, { x: e.pageX, y: e.pageY });
              }
            }}
          >
            {article.body ? (
              <Image
                src={article.body.url}
                alt=""
                className={styles.image}
                width={article.body.width}
                height={article.body.height}
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
