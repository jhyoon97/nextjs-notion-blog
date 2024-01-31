import React from "react";
import styled from "styled-components";

import type { HasChildrenNumberedList } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  blocks: Array<HasChildrenNumberedList>;
  depth: number;
}

const Wrapper = styled.ol`
  ${commonBox}
  list-style: none;
  counter-reset: li;
`;

const Item = styled.li<{ $depth: number }>`
  position: relative;
  margin-bottom: 0.25rem;
  width: 100%;
  font-size: 1rem;

  &:before {
    counter-increment: li;
    content: counter(
        li,
        ${({ $depth }) =>
          (() => {
            switch ($depth % 3) {
              case 1:
                return "decimal";
              case 2:
                return "lower-alpha";
              case 0:
                return "lower-roman";
              default:
                return "decimal";
            }
          })()}
      )
      ".";
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    padding-right: 0.6rem;
  }
`;

const NumberedList = ({ blocks, depth }: Props) => {
  return (
    <Wrapper style={{ paddingLeft: depth === 1 ? "1.5rem" : 0 }}>
      {blocks.map((item) => (
        <React.Fragment key={item.id}>
          <Item $depth={depth}>
            <RichText richText={item.numbered_list_item.rich_text} />
          </Item>
          {item.numbered_list_item.children && (
            <NotionRenderer
              blocks={item.numbered_list_item.children}
              depth={depth + 1}
            />
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default NumberedList;
