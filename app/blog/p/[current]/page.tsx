import { notFound } from "next/navigation";
import { getBlogList } from "@/app/_libs/microcms";
import BlogList from "@/app/_components/BlogList";
import Pagination from "@/app/_components/Pagination";
import { BLOG_LIST_LIMIT } from "@/app/_constants";

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

  const { contents: blogs, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
    offset: BLOG_LIST_LIMIT * (current - 1),
  });

  if (blogs.length === 0) {
    notFound();
  }

  return (
    <>
      <BlogList blogs={blogs} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath="/blog"
        limit={BLOG_LIST_LIMIT}
      />
    </>
  );
}
