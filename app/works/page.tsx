import { getWorksList } from "@/app/_libs/microcms";
import WorksList from "@/app/_components/WorksList";
import Pagination from "@/app/_components/Pagination";
import { WORKS_LIST_LIMIT } from "@/app/_constants";
import styles from "../pages.module.css";

export default async function Page() {
  const { contents: works, totalCount } = await getWorksList({
    limit: WORKS_LIST_LIMIT,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>WORKS</h2>
      <WorksList works={works} />
      <Pagination
        totalCount={totalCount}
        basePath="/works"
        limit={WORKS_LIST_LIMIT}
      />
    </section>
  );
}
