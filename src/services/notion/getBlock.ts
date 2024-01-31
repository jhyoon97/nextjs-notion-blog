import type { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

import client from "./client";

export default async (blockId: string): Promise<GetBlockResponse> => {
  try {
    const block = await client.blocks.retrieve({ block_id: blockId });

    return block;
  } catch (err) {
    return Promise.reject(err);
  }
};
