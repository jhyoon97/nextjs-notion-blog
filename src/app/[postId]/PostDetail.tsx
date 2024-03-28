"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import type { PostResponse } from "@/types/app";
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

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 300px);

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
  const [tableOfContentsTop, setTableOfContentsTop] = useState<
    undefined | number
  >(undefined);

  useEffect(() => {
    setTableOfContentsTop(contentsBoxRef.current?.offsetTop);
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{data.title}</Title>
        <CreatedAt>{data.createdAt}</CreatedAt>
      </TitleWrapper>

      <ContentsWrapper ref={contentsBoxRef}>
        <NotionRenderer blocks={data.blocks} />
      </ContentsWrapper>

      {tableOfContentsTop !== undefined && (
        <TableOfContentsWrapper
          style={{
            top: tableOfContentsTop,
          }}
        >
          <TableOfContentsFixedWrapper>
            <TableOfContents blocks={data.blocks} />
          </TableOfContentsFixedWrapper>
        </TableOfContentsWrapper>
      )}
    </Wrapper>
  );
};

export default PostDetail;
