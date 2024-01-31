import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { isFullPage } from "@notionhq/client";

import notionServices from "@/services/notion";

const getPageTitle = (
  page: PageObjectResponse | PartialPageObjectResponse
): string => {
  if (isFullPage(page)) {
    const titleKey = Object.keys(page.properties).find(
      (key) => page.properties[key].type === "title"
    );

    return titleKey
      ? (page.properties[titleKey] as any).title[0].plain_text
      : "제목 없음";
  }

  return "제목 없음";
};

const deepFetchAllChildren = async (blocks: BlockObjectResponse[]) => {
  const newBlocks = [...blocks];
  const hasChildrenMap = newBlocks
    .filter((item) => item.has_children)
    .map((item) => ({
      promise: notionServices.getChildren(item.id),
      parentRef: item,
    }));
  const responses = await Promise.all(
    hasChildrenMap.map((item) => item.promise)
  );

  for (let i = 0; i < responses.length; i += 1) {
    const childBlocks = responses[i];
    const parentRef: any = hasChildrenMap[i].parentRef;

    await deepFetchAllChildren(childBlocks);

    parentRef[parentRef.type].children = childBlocks;
  }

  return newBlocks;
};

export default {
  getPageTitle,
  deepFetchAllChildren,
};
