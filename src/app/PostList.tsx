"use client";

import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";

import type { PostListResponse } from "@/types/app";

interface Props {
  postList: PostListResponse;
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.5rem 1rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.box.border};
  border-radius: 5px;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.box.title};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.box.date};
  font-size: 0.8rem;
`;

const PostList = ({ postList }: Props) => {
  return (
    <List>
      {postList.map((item) => (
        <Item key={item.id} href={`/${item.id}`}>
          <Title>{item.title}</Title>
          <Date>{dayjs(item.createdAt).format("YYYY-MM-DD")}</Date>
        </Item>
      ))}
    </List>
  );
};

export default PostList;
