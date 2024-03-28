import type { CSSProperties } from "react";
import { useMemo } from "react";
import styled from "styled-components";

import type {
  BlockGroup,
  HasChildrenBlockObject,
  ProcessedBlockArray,
  HasChildrenBulletedList,
  HasChildrenNumberedList,
  HasChildrenToDo,
} from "@/types/notion";
import utils from "@/utils";
import typeGuards from "@/utils/typeGuards";

import BlockGroups from "./BlockGroups";
import Blocks from "./Blocks";

interface Props {
  blocks: HasChildrenBlockObject[];
  depth?: number;
  style?: CSSProperties;
}

const Wrapper = styled.div<{ $depth: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${({ $depth }) => ($depth > 1 ? 1.5 : 0)}rem;
  width: 100%;
  color: ${({ theme }) => theme.contents.text};
`;

// 그룹핑이 필요한 블록 타입
const needGroupingTypes = ["bulleted_list_item", "numbered_list_item", "to_do"];

const NotionRenderer = ({ blocks, depth = 1, style = {} }: Props) => {
  const processedBlockArray = useMemo<ProcessedBlockArray>(() => {
    return blocks.reduce<ProcessedBlockArray>((acc, item) => {
      if (typeGuards.contains(needGroupingTypes, item.type)) {
        // 그룹핑이 필요한 블록인 경우 (ol, ul 등)
        const lastAccItem = utils.getLastItem(acc);

        if (
          lastAccItem &&
          typeGuards.isBlockGroup(lastAccItem) &&
          lastAccItem.groupType === item.type
        ) {
          // 누산 중인 배열 마지막 아이템이 그룹상태이고, 현재 아이템과 타입이 같다면 그룹에 포함
          lastAccItem.blocks.push(item);

          return acc;
        }

        // 누산 중인 배열 마지막 아이템이 그룹상태가 아닌 경우 새로운 그룹 생성
        return acc.concat({
          groupType: item.type,
          blocks: [item],
        } as BlockGroup);
      }

      return acc.concat(item);
    }, []);
  }, [blocks]);

  return (
    <Wrapper $depth={depth} style={style}>
      {processedBlockArray.map((item) =>
        (() => {
          if (typeGuards.isBlockGroup(item)) {
            switch (item.groupType) {
              case "bulleted_list_item":
                return (
                  <BlockGroups.BulletedList
                    key={item.blocks[0].id}
                    blocks={item.blocks as Array<HasChildrenBulletedList>}
                    depth={depth}
                  />
                );
              case "numbered_list_item":
                return (
                  <BlockGroups.NumberedList
                    key={item.blocks[0].id}
                    blocks={item.blocks as Array<HasChildrenNumberedList>}
                    depth={depth}
                  />
                );
              case "to_do":
                return (
                  <BlockGroups.ToDoList
                    key={item.blocks[0].id}
                    blocks={item.blocks as Array<HasChildrenToDo>}
                    depth={depth}
                  />
                );
              default:
                return null;
            }
          } else {
            switch (item.type) {
              case "heading_1":
                return (
                  <Blocks.HeadingLevel1
                    key={item.id}
                    block={item}
                    depth={depth}
                  />
                );
              case "heading_2":
                return (
                  <Blocks.HeadingLevel2
                    key={item.id}
                    block={item}
                    depth={depth}
                  />
                );
              case "heading_3":
                return (
                  <Blocks.HeadingLevel3
                    key={item.id}
                    block={item}
                    depth={depth}
                  />
                );
              case "code":
                return <Blocks.Code key={item.id} block={item} />;
              case "image":
                return <Blocks.Image key={item.id} block={item} />;
              case "paragraph":
                return (
                  <Blocks.Paragraph key={item.id} block={item} depth={depth} />
                );
              case "bookmark":
                return <Blocks.Bookmark key={item.id} block={item} />;
              case "toggle":
                return (
                  <Blocks.Toggle key={item.id} block={item} depth={depth} />
                );
              case "quote":
                return <Blocks.Quote key={item.id} block={item} />;
              case "column_list":
                return <Blocks.ColumnList key={item.id} block={item} />;
              case "divider":
                return <Blocks.Divider key={item.id} />;
              case "callout":
                return <Blocks.Callout key={item.id} block={item} />;
              case "table":
                return <Blocks.Table key={item.id} block={item} />;
              default:
                return null;
            }
          }
        })()
      )}
    </Wrapper>
  );
};

export default NotionRenderer;
