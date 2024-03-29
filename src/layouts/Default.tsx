"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAtom } from "jotai";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

import constants from "@/utils/constants";
import { isDarkModeAtom } from "@/atoms/isDarkMode";

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
    justify-content: space-between;
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

const Theme = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    height: 24px;
    color: ${({ theme }) => theme.header.text};
  `,
  Switch: styled.button<{ $isDarkMode: boolean }>`
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    overflow: hidden;
    background: ${({ theme }) => theme.header.switch};
    border: 2px solid ${({ theme }) => theme.header.switch};
  `,
  Indicator: styled.div<{ $isDarkMode: boolean }>`
    position: absolute;
    top: 0;
    left: ${({ $isDarkMode }) => ($isDarkMode ? 20 : -40)}px;
    width: 60px;
    height: 100%;
    border-radius: 10px;
    background: ${({ theme }) => theme.header.bg};
  `,
};

const Layout = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  return (
    <Wrapper>
      <Header.Wrapper>
        <Header.InnerWrapper>
          <Link href="/">
            <Header.Title>jhdev</Header.Title>
          </Link>

          <Theme.Wrapper>
            <HiMiniSun size={19} />
            <Theme.Switch
              $isDarkMode={isDarkMode}
              onClick={() => {
                setIsDarkMode(!isDarkMode);
              }}
            >
              <Theme.Indicator $isDarkMode={isDarkMode} />
            </Theme.Switch>
            <HiMiniMoon size={14} />
          </Theme.Wrapper>
        </Header.InnerWrapper>
      </Header.Wrapper>
      <Body.Wrapper>
        <Body.InnerWrapper>{children}</Body.InnerWrapper>
      </Body.Wrapper>
    </Wrapper>
  );
};

export default Layout;
