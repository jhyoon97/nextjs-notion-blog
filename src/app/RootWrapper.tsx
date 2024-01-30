"use client";

import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
`;

const RootWrapper = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default RootWrapper;
