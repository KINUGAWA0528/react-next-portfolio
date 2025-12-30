import { getEventList } from "@/app/_libs/microcms";
import EventList from "@/app/_components/EventList";
import Pagination from "@/app/_components/Pagination";
import { EVENT_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const { contents: events, totalCount } = await getEventList({
    limit: EVENT_LIST_LIMIT,
  });

  return (
    <>
      <EventList events={events} />
      <Pagination
        totalCount={totalCount}
        basePath="/events"
        limit={EVENT_LIST_LIMIT}
      />
    </>
  );
}
