import { Client } from "@notionhq/client";

import config from "@/config";

const notionClient = new Client({
  auth: config.notion.apiKey,
  fetch,
});

export default notionClient;
