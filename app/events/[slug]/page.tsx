import { notFound } from "next/navigation";
import { getEventDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";
import commonStyles from "@/app/pages.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const data = await getEventDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <section className={commonStyles.section}>
      <h2 className={commonStyles.sectionTitle}>EVENT DETAIL</h2>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/events">イベント一覧へ</ButtonLink>
      </div>
    </section>
  );
}
