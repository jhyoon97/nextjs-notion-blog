import dayjs from "dayjs";
import { isFullPage } from "@notionhq/client";

import type { PostListResponse } from "@/types/app";
import config from "@/config";
import notionUtils from "@/utils/notion";

import client from "./client";

export default async (): Promise<PostListResponse> => {
  try {
    const response = await client.databases.query({
      database_id: config.notion.databaseId,
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
      filter:
        process.env.NODE_ENV === "production"
          ? {
              property: "isPublic",
              checkbox: { equals: true },
            }
          : undefined,
    });

    const data = [];

    for (let i = 0; i < response.results.length; i += 1) {
      const item = response.results[i];

      if (isFullPage(item)) {
        data.push({
          id: item.id,
          title: notionUtils.getPageTitle(item),
          createdAt: dayjs(item.created_time).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
    }

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
