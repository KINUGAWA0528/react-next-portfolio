import { notFound } from "next/navigation";
import { getWorksList } from "@/app/_libs/microcms";
import WorksList from "@/app/_components/WorksList";
import Pagination from "@/app/_components/Pagination";
import { WORKS_LIST_LIMIT } from "@/app/_constants";
import styles from "../../../pages.module.css";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const { contents: works, totalCount } = await getWorksList({
    limit: WORKS_LIST_LIMIT,
    offset: WORKS_LIST_LIMIT * (current - 1),
  });

  if (works.length === 0) {
    notFound();
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>WORKS</h2>
      <WorksList works={works} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath="/works"
        limit={WORKS_LIST_LIMIT}
      />
    </section>
  );
}
