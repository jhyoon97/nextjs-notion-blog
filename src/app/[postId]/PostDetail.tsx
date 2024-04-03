"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";

import type { PostResponse, TableOfContentsInterface } from "@/types/app";

import { tableOfContentsAtom } from "@/atoms/tableOfContents";
import NotionRenderer from "@/components/NotionRenderer";
import TableOfContents from "@/components/TableOfContents";
import constants from "@/utils/constants";

interface Props {
  data: PostResponse;
}

const Wrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleWrapper = styled.div``;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.contents.title};
`;

const ContentsWrapper = styled.div<{ $hasTableOfContents: boolean }>`
  display: flex;
  flex-direction: row;
  width: ${({ $hasTableOfContents }) =>
    $hasTableOfContents ? "calc(100% - 300px)" : "100%"};

  ${constants.mediaQuery.isTablet} {
    width: 100%;
  }
`;

const TableOfContentsWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;

  ${constants.mediaQuery.isTablet} {
    display: none;
  }
`;

const TableOfContentsFixedWrapper = styled.div`
  position: fixed;
  padding-left: 1rem;
  width: 300px;
`;

const CreatedAt = styled.time`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.contents.subText};
  font-size: 1rem;
  display: block;
`;

const PostDetail = ({ data }: Props) => {
  const contentsBoxRef = useRef<HTMLDivElement>(null);
  const [tableOfContents, setTableOfContents] = useAtom(tableOfContentsAtom);
  const [tableOfContentsTop, setTableOfContentsTop] = useState<
    undefined | number
  >(undefined);

  useEffect(() => {
    setTableOfContentsTop(contentsBoxRef.current?.offsetTop);
  }, []);

  useEffect(() => {
    setTableOfContents(
      data.blocks.reduce<TableOfContentsInterface>((acc, block) => {
        if (
          block.type === "heading_1" ||
          block.type === "heading_2" ||
          block.type === "heading_3"
        ) {
          const targetBlock = (() => {
            switch (block.type) {
              case "heading_1":
                return block.heading_1;
              case "heading_2":
                return block.heading_2;
              default:
                return block.heading_3;
            }
          })();

          acc.push({
            type: block.type,
            id: block.id,
            text: targetBlock.rich_text
              .map((item: any) => item.plain_text)
              .join(""),
          });
        }

        return acc;
      }, [])
    );
  }, [data.blocks]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{data.title}</Title>
        <CreatedAt>{data.createdAt}</CreatedAt>
      </TitleWrapper>

      {tableOfContents.length > 0 && tableOfContentsTop !== undefined && (
        <TableOfContentsWrapper
          style={{
            top: tableOfContentsTop,
          }}
        >
          <TableOfContentsFixedWrapper>
            <TableOfContents />
          </TableOfContentsFixedWrapper>
        </TableOfContentsWrapper>
      )}

      <ContentsWrapper
        ref={contentsBoxRef}
        $hasTableOfContents={tableOfContents.length > 0}
      >
        <NotionRenderer blocks={data.blocks} />
      </ContentsWrapper>
    </Wrapper>
  );
};

export default PostDetail;
