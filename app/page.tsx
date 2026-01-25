import styles from "./pages.module.css";
import Image from "next/image";
import { getBlogList, getWorksList, getEventList } from "@/app/_libs/microcms";
import {
  TOP_BLOG_LIMIT,
  TOP_WORKS_LIMIT,
  TOP_EVENT_LIMIT,
} from "@/app/_constants";
import EventSection from "@/app/_components/EventSection";
import BlogList from "@/app/_components/BlogList";
import WorksList from "@/app/_components/WorksList";
import ButtonLink from "@/app/_components/ButtonLink";
import BlogSection from "@/app/_components/BlogSection";
import WorksSection from "@/app/_components/WorksSection";
import Windows from "@/app/_components/Windows";
import HomeTitle from "@/app/_components/HomeTitle";

export const revalidate = 60;

export default async function Home() {
  const [blogData, worksData, eventData] = await Promise.all([
    getBlogList({
      limit: TOP_BLOG_LIMIT,
    }),
    getWorksList({
      limit: TOP_WORKS_LIMIT,
      orders: "-date",
    }),
    getEventList({
      limit: TOP_EVENT_LIMIT,
      orders: "-date",
    }),
  ]);

  const sortedWorks = [...worksData.contents].sort((a, b) => {
    const getDate = (w: typeof a) =>
      w.date || w.publishedAt || w.createdAt || "1970-01-01";
    return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
  });

  const sortedEvents = [...eventData.contents].sort((a, b) => {
    const getDate = (e: typeof a) =>
      e.date || e.publishedAt || e.createdAt || "1970-01-01";
    return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
  });

  return (
    <>
      <Windows />
      <HomeTitle />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>EVENT</h2>
        <EventSection events={sortedEvents} />
        <div className={styles.linkButton}>
          <ButtonLink href="/events">VIEW MORE</ButtonLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>WORKS</h2>
        <p className={styles.sectionDescription}>
          <br />
        </p>
        <WorksSection works={sortedWorks} />
        <div className={styles.linkButton}>
          <ButtonLink href="/works">VIEW MORE</ButtonLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>BLOG</h2>
        <BlogSection blogs={blogData.contents} />
        <div className={styles.linkButton}>
          <ButtonLink href="/blog">VIEW MORE</ButtonLink>
        </div>
      </section>
    </>
  );
}
