/* eslint-disable react/no-array-index-key */
import styled from "styled-components";

import type { ProcessedRichTextItem } from "@/types/notion";
import typeGuards from "@/utils/typeGuards";

import Anchor from "./Anchor";
import Span from "./Span";

interface Props {
  processedRichTextItem: ProcessedRichTextItem;
}

const CodeText = styled.code`
  padding: 0px 4px;
  background: ${({ theme }) => theme.contents.bgCode};
  color: ${({ theme }) => theme.contents.code};
  border-radius: 4px;
`;

const Code = ({ processedRichTextItem }: Props) => {
  return (
    <CodeText>
      {(() => {
        if (typeGuards.isRichTextGroup(processedRichTextItem)) {
          return processedRichTextItem.richText.map((item, index) => {
            if (typeGuards.isRichTextGroup(item) && item.groupType === "link") {
              return <Anchor key={index} processedRichTextItem={item} />;
            }

            if (typeGuards.isRichTextItemResponse(item)) {
              return <Span key={index} richTextItem={item} />;
            }

            return null;
          });
        }

        if (
          typeGuards.isRichTextItemResponse(processedRichTextItem) &&
          processedRichTextItem.href
        ) {
          return <Anchor processedRichTextItem={processedRichTextItem} />;
        }

        return processedRichTextItem.plain_text;
      })()}
    </CodeText>
  );
};

export default Code;
