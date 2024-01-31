/* eslint-disable no-restricted-syntax */
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { iteratePaginatedAPI, isFullBlock } from "@notionhq/client";

import client from "./client";

export default async (blockId: string): Promise<Array<BlockObjectResponse>> => {
  try {
    const response = [];

    for await (const block of iteratePaginatedAPI(client.blocks.children.list, {
      block_id: blockId,
      page_size: 100,
    })) {
      if (isFullBlock(block)) {
        response.push(block);
      }
    }

    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};
