/* eslint-disable react/no-array-index-key */
/*
컴포넌트 구조
RichText
ㄴ Code
    ㄴ Link
        ㄴ Span
    ㄴ Span
ㄴ Link
    ㄴ Span
ㄴ Span
*/
import { useMemo } from "react";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ProcessedRichTextArray } from "@/types/notion";
import utils from "@/utils";
import typeGuards from "@/utils/typeGuards";

import Span from "./Span";
import Anchor from "./Anchor";
import Code from "./Code";

interface Props {
  richText: Array<RichTextItemResponse>;
}

const groupingLink = (array: ProcessedRichTextArray) => {
  return array.reduce<ProcessedRichTextArray>((acc, item, index, arr) => {
    const nextItem = arr[index + 1];
    const prevItem = arr[index - 1];

    if (
      typeGuards.isRichTextItemResponse(item) &&
      item.href !== null &&
      ((typeGuards.isRichTextItemResponse(nextItem) &&
        item.annotations.code === nextItem.annotations.code) || // 다음 블록과 href 값이 같거나
        index + 1 === arr.length) // 마지막 블록이라서 다음 아이템과 비교할 수 없는 경우 통과
    ) {
      const lastAccItem = utils.getLastItem(acc);

      if (
        lastAccItem &&
        typeGuards.isRichTextGroup(lastAccItem) &&
        typeGuards.isRichTextItemResponse(prevItem) &&
        item.href === prevItem.href
      ) {
        // 누산 중인 배열 마지막 아이템이 그룹상태이고, 이전 아이템과 href 값이 같다면 현재 블록을 그룹에 포함
        lastAccItem.richText.push(item);

        return acc;
      }

      if (
        typeGuards.isRichTextItemResponse(item) &&
        typeGuards.isRichTextItemResponse(nextItem) &&
        item.href === nextItem.href
      ) {
        // 누산 중인 배열 마지막 아이템이 그룹상태가 아니고
        // 다음 블록과 href 값이 같은 경우 현재 블록으로 그룹 생성
        return acc.concat({ groupType: "link", richText: [item] });
      }

      return acc.concat(item);
    }

    return acc.concat(item);
  }, []);
};

const RichText = ({ richText }: Props) => {
  const processedRichTextArray = useMemo<ProcessedRichTextArray>(() => {
    // 코드, 링크, 코드 내의 링크 순으로 그룹핑
    const groupByCode = richText.reduce<ProcessedRichTextArray>(
      (acc, item, index, arr) => {
        if (item.annotations.code) {
          // 현재 블록이 코드인 경우
          const lastAccItem = utils.getLastItem(acc);

          if (lastAccItem && typeGuards.isRichTextGroup(lastAccItem)) {
            // 누산 중인 배열 마지막 아이템이 그룹상태라면 현재 블록을 그룹에 포함
            lastAccItem.richText.push(item);

            return acc;
          }

          if (arr[index + 1]?.annotations.code) {
            // 누산 중인 배열 마지막 아이템이 그룹상태가 아니고
            // 다음 블록도 코드인 경우 현재 블록으로 그룹 생성
            return acc.concat({ groupType: "code", richText: [item] });
          }
        }

        return acc.concat(item);
      },
      []
    );

    const groupByLink = groupingLink(groupByCode);

    const groupByLinkInCode = groupByLink.map((item) => {
      if (typeGuards.isRichTextGroup(item) && item.groupType === "code") {
        // 그룹핑 타입이 코드인 경우 링크 그룹핑 함수 호출
        return {
          groupType: item.groupType,
          richText: groupingLink(item.richText),
        };
      }

      return item;
    });

    return groupByLinkInCode;
  }, [richText]);

  return (
    <>
      {processedRichTextArray.map((item, index) => {
        return (() => {
          if (
            (typeGuards.isRichTextItemResponse(item) &&
              item.annotations.code) ||
            (typeGuards.isRichTextGroup(item) && item.groupType === "code")
          ) {
            return <Code key={index} processedRichTextItem={item} />;
          }

          if (
            (typeGuards.isRichTextItemResponse(item) && item.href) ||
            (typeGuards.isRichTextGroup(item) && item.groupType === "link")
          ) {
            return <Anchor key={index} processedRichTextItem={item} />;
          }

          if (typeGuards.isRichTextItemResponse(item)) {
            return <Span key={index} richTextItem={item} />;
          }

          return null;
        })();
      })}
    </>
  );
};

export default RichText;
