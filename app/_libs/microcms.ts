import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

export type Blog = {
  title: string;
  description: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

export type Works = {
  title: string;
  description: string;
  content: string;
  body?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

export type Event = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Member>({
      endpoint: "members",
      queries,
    })
    .catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    }));
  return listData;
};

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<News>({
      endpoint: "news",
      queries,
    })
    .catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    }));
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return detailData;
};

export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Blog>({
      endpoint: "blogs",
      queries,
    })
    .catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    }));
  return listData;
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
  return detailData;
};

export const getWorksList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Works>({
      endpoint: "works",
      queries,
    })
    .catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    }));
  return listData;
};

export const getWorksDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Works>({
    endpoint: "works",
    contentId,
    queries,
  });
  return detailData;
};

export const getEventList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Event>({
      endpoint: "events",
      queries,
    })
    .catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    }));
  return listData;
};

export const getEventDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Event>({
    endpoint: "events",
    contentId,
    queries,
  });
  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};
