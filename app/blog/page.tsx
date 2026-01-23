import { getBlogList } from "@/app/_libs/microcms";
import BlogList from "@/app/_components/BlogList";
import Pagination from "@/app/_components/Pagination";
import { BLOG_LIST_LIMIT } from "@/app/_constants";
import styles from "../pages.module.css";

export default async function Page() {
  const { contents: blogs, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>BLOG</h2>
      <BlogList blogs={blogs} />
      <Pagination
        totalCount={totalCount}
        basePath="/blog"
        limit={BLOG_LIST_LIMIT}
      />
    </section>
  );
}
