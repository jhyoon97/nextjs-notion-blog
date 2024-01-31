import styled from "styled-components";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  richTextItem: RichTextItemResponse;
}

const SpanText = styled.span<{ $richTextItem: RichTextItemResponse }>`
  font-style: ${({ $richTextItem }) =>
    $richTextItem.annotations.italic ? "italic" : "inherit"};
  font-weight: ${({ $richTextItem }) =>
    $richTextItem.annotations.bold ? "bold" : "inherit"};
  text-decoration: ${({ $richTextItem }) =>
    (() => {
      const decorations = [];

      if ($richTextItem.annotations.underline) {
        decorations.push("underline");
      }
      if ($richTextItem.annotations.strikethrough) {
        decorations.push("line-through");
      }
      return decorations.join(" ") || "unset";
    })()};
  color: ${({ theme, $richTextItem }) =>
    (() => {
      if ($richTextItem.annotations.color === "default") {
        return "inherit";
      }

      if (!$richTextItem.annotations.color.endsWith("background")) {
        return theme.notion[$richTextItem.annotations.color];
      }

      return "inherit";
    })()};
  background: ${({ theme, $richTextItem }) =>
    (() => {
      if ($richTextItem.annotations.color === "default") {
        return "unset";
      }

      if ($richTextItem.annotations.color.endsWith("background")) {
        return theme.notion[$richTextItem.annotations.color];
      }

      return "unset";
    })()};
`;

const Span = ({ richTextItem }: Props) => {
  if (
    richTextItem.annotations.bold ||
    richTextItem.annotations.italic ||
    richTextItem.annotations.strikethrough ||
    richTextItem.annotations.underline ||
    richTextItem.annotations.color !== "default"
  ) {
    return (
      <SpanText $richTextItem={richTextItem}>
        {richTextItem.plain_text}
      </SpanText>
    );
  }

  return <>{richTextItem.plain_text}</>;
};

export default Span;
