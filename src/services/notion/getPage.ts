import dayjs from "dayjs";
import { isFullPage, isFullBlock } from "@notionhq/client";

import config from "@/config";
import type { PostResponse } from "@/types/app";
import notionUtils from "@/utils/notion";
import notionServices from "@/services/notion";

import client from "./client";

export default async (postId: string): Promise<PostResponse> => {
  try {
    const {
      results: [{ id: pageId }],
    } = await client.databases.query({
      database_id: config.notion.databaseId,
      filter: {
        and: [
          {
            property: "postId",
            unique_id: { equals: Number(postId) },
          },
        ],
      },
    });
    const pageResponse = await client.pages.retrieve({
      page_id: pageId,
    });
    const contentBlocks = await notionServices.getChildren(pageId);

    if (isFullPage(pageResponse)) {
      if (
        process.env.NODE_ENV === "production" &&
        pageResponse.properties.isPublic.type === "checkbox"
      ) {
        if (!pageResponse.properties.isPublic.checkbox) {
          throw new Error("getPage: 공개되지 않은 페이지입니다.");
        }
      }

      const pageData = {
        title: notionUtils.getPageTitle(pageResponse),
        createdAt: dayjs(pageResponse.created_time).format("YYYY-MM-DD"),
        hasTableOfContents: !!contentBlocks.find(
          (block) => isFullBlock(block) && block.type === "table_of_contents"
        ),
        blocks: await notionUtils.deepFetchAllChildren(
          contentBlocks.filter((block) => isFullBlock(block))
        ),
      };

      return pageData;
    }

    throw new Error("getPage: no PartialPageResponse");
  } catch (err) {
    return Promise.reject(err);
  }
};
