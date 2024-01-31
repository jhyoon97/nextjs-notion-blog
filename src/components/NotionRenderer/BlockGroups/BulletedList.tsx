import React from "react";
import styled, { css } from "styled-components";

import type { HasChildrenBulletedList } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  blocks: Array<HasChildrenBulletedList>;
  depth: number;
}

const Wrapper = styled.ul`
  ${commonBox}
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  margin-bottom: 0.25rem;
  width: 100%;
  font-size: 1rem;
`;

const BulletBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 18px;
  width: 6px;
  height: 1.5em;
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const Bullet = styled.i<{ $depth: number }>`
  width: 100%;
  height: 6px;
  background: currentcolor;
  border-color: currentcolor;

  ${({ $depth }) =>
    (() => {
      switch ($depth % 3) {
        case 1:
          return css`
            border-radius: 50%;
          `;
        case 0:
          return css`
            border-radius: 50%;
            border-width: 1px;
            border-style: solid;
            background: transparent;
          `;
        default:
          return css``;
      }
    })()}
`;

const BulletedList = ({ blocks, depth }: Props) => {
  return (
    <Wrapper>
      {blocks.map((item) => (
        <React.Fragment key={item.id}>
          <Item>
            <BulletBox>
              <Bullet $depth={depth} />
            </BulletBox>
            <TextWrapper>
              <RichText richText={item.bulleted_list_item.rich_text} />
            </TextWrapper>
          </Item>
          {item.bulleted_list_item.children && (
            <NotionRenderer
              blocks={item.bulleted_list_item.children}
              depth={depth + 1}
            />
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default BulletedList;
