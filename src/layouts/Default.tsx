"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

import constants from "@/utils/constants";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
`;

const Header = {
  Wrapper: styled.div`
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.header.bg};
  `,
  InnerWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    padding: 1rem 2rem;
    width: 100%;
    max-width: 1200px;

    ${constants.mediaQuery.isTablet} {
      padding: 1rem;
    }
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.header.text};
    font-size: 1rem;
  `,
};

const Body = {
  Wrapper: styled.div`
    z-index: 1;
    padding-top: calc(1.5rem + 2rem);
    width: 100%;
  `,
  InnerWrapper: styled.main`
    padding: 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;

    ${constants.mediaQuery.isTablet} {
      padding: 1rem;
    }
  `,
};

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header.Wrapper>
        <Header.InnerWrapper>
          <Link href="/">
            <Header.Title>jhdev</Header.Title>
          </Link>
        </Header.InnerWrapper>
      </Header.Wrapper>
      <Body.Wrapper>
        <Body.InnerWrapper>{children}</Body.InnerWrapper>
      </Body.Wrapper>
    </Wrapper>
  );
};

export default Layout;
