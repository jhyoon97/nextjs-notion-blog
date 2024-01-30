"use client";

import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

const ContentWrapper = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ContentWrapper;
