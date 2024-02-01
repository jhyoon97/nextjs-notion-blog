import { useState, useMemo } from "react";
import styled, { css } from "styled-components";

import useScroll from "@/hooks/useScroll";

import type { HasChildrenBlockObject } from "@/types/notion";

interface Props {
  blocks: Array<HasChildrenBlockObject>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.a<{ $isFocused: boolean }>`
  text-align: left;
  transform-origin: 0 50%;
  transition: transform 0.1s ease-in;
  transform: scale(${({ $isFocused }) => ($isFocused ? 1.02 : 1)});

  ${({ theme, $isFocused }) =>
    $isFocused
      ? css`
          color: ${theme.tableOfContents.highlight};
        `
      : css`
          color: ${theme.tableOfContents.text};

          &:hover {
            color: ${theme.tableOfContents.hover};
          }
        `}
`;

const TableOfContents = ({ blocks }: Props) => {
  const [focusHeadingId, setFocusHeadingId] = useState("");

  const tableOfContents = useMemo(() => {
    return blocks
      .filter((block) => block.type.startsWith("heading_"))
      .map((block) => ({
        type: block.type,
        id: block.id,
        text: (block as any)[block.type].rich_text
          .map((item: any) => item.text.content)
          .join(""),
      }));
  }, [blocks]);

  useScroll(() => {
    for (let i = tableOfContents.length - 1; i >= 0; i -= 1) {
      const element = document.getElementById(tableOfContents[i].id);

      if (
        window.scrollY + (element?.getBoundingClientRect().y || 0) <=
          window.scrollY + 10 ||
        i === 0
      ) {
        setFocusHeadingId(tableOfContents[i].id);
        break;
      }
    }
  }, [tableOfContents]);

  return (
    <Wrapper>
      {tableOfContents.map((item) => (
        <Item
          type="button"
          key={item.id}
          $isFocused={focusHeadingId === item.id}
          style={{
            marginLeft: `${Number(item.type.replace("heading_", ""))}rem`,
          }}
          href={`#${item.id}`}
        >
          {item.text}
        </Item>
      ))}
    </Wrapper>
  );
};

export default TableOfContents;
