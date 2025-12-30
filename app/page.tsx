import styles from "./pages.module.css";
import Image from "next/image";
import { getBlogList, getWorksList, getEventList } from "@/app/_libs/microcms";
import {
  TOP_BLOG_LIMIT,
  TOP_WORKS_LIMIT,
  TOP_EVENT_LIMIT,
} from "@/app/_constants";
import EventList from "@/app/_components/EventList";
import BlogList from "@/app/_components/BlogList";
import WorksList from "@/app/_components/WorksList";
import ButtonLink from "@/app/_components/ButtonLink";
import Background3D from "@/app/_components/Background3D";
import Windows from "@/app/_components/Windows";
import OpeningLoading from "@/app/_components/OpeningLoading";
import BlogSection from "@/app/_components/BlogSection";
import WorksSection from "@/app/_components/WorksSection";

export const revalidate = 60;

export default async function Home() {
  const [blogData, worksData, eventData] = await Promise.all([
    getBlogList({
      limit: TOP_BLOG_LIMIT,
    }),
    getWorksList({
      limit: TOP_WORKS_LIMIT,
    }),
    getEventList({
      limit: TOP_EVENT_LIMIT,
    }),
  ]);

  return (
    <>
      <OpeningLoading />
      <Windows />
      <section className={styles.top}>
        <Background3D />
        <div className={styles.content}>
          <h1 className={styles.title}>PORTFOLIO</h1>
          <p className={styles.description}>Illustration & Design</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>EVENT _</h2>
        <EventList events={eventData.contents} />
        <div className={styles.linkButton}>
          <ButtonLink href="/events">VIEW MORE</ButtonLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>WORKS _</h2>
        <p className={styles.sectionDescription}>
          イラストだけでなく、Webデザインやグッズ制作など
          <br />
          幅広いジャンルの制作を得意としています。
        </p>
        <WorksSection works={worksData.contents} />
        <div className={styles.linkButton}>
          <ButtonLink href="/works">VIEW MORE</ButtonLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>BLOG _</h2>
        <BlogSection blogs={blogData.contents} />
        <div className={styles.linkButton}>
          <ButtonLink href="/blog">VIEW MORE</ButtonLink>
        </div>
      </section>
    </>
  );
}
