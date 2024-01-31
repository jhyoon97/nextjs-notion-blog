/* eslint-disable react/no-array-index-key */
import styled from "styled-components";

import type { ProcessedRichTextItem } from "@/types/notion";
import typeGuards from "@/utils/typeGuards";

import Span from "./Span";

interface Props {
  processedRichTextItem: ProcessedRichTextItem;
}

const AnchorText = styled.a`
  color: ${({ theme }) => theme.link};
  border-bottom: 1px solid ${({ theme }) => theme.link};
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const Anchor = ({ processedRichTextItem }: Props) => {
  return (
    <AnchorText
      href={(() => {
        if (
          typeGuards.isRichTextItemResponse(processedRichTextItem) &&
          processedRichTextItem.href
        ) {
          return processedRichTextItem.href;
        }

        if (
          typeGuards.isRichTextGroup(processedRichTextItem) &&
          typeGuards.isRichTextItemResponse(
            processedRichTextItem.richText[0]
          ) &&
          processedRichTextItem.richText[0].href
        ) {
          return processedRichTextItem.richText[0].href;
        }

        return "#";
      })()}
      target="_blank"
      rel="noreferrer"
    >
      {(() => {
        if (typeGuards.isRichTextGroup(processedRichTextItem)) {
          return processedRichTextItem.richText.map((item, index) => {
            if (typeGuards.isRichTextItemResponse(item)) {
              return <Span key={index} richTextItem={item} />;
            }

            return null;
          });
        }

        return processedRichTextItem.plain_text;
      })()}
    </AnchorText>
  );
};

export default Anchor;
