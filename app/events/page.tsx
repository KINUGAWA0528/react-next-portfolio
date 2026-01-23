import { getEventList } from "@/app/_libs/microcms";
import EventSection from "@/app/_components/EventSection";
import Pagination from "@/app/_components/Pagination";
import { EVENT_LIST_LIMIT } from "@/app/_constants";
import styles from "../pages.module.css";

export default async function Page() {
  const { contents: events, totalCount } = await getEventList({
    limit: EVENT_LIST_LIMIT,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>EVENT</h2>
      <EventSection events={events} />
      <Pagination
        totalCount={totalCount}
        basePath="/events"
        limit={EVENT_LIST_LIMIT}
      />
    </section>
  );
}
