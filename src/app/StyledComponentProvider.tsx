"use client";

import { ThemeProvider } from "styled-components";
import { useAtom } from "jotai";

import Registry from "@/utils/styled/Registry";
import GlobalStyles from "@/utils/styled/GlobalStyle";
import theme from "@/utils/styled/theme";
import { isDarkModeAtom } from "@/atoms/isDarkMode";

interface Props {
  children: React.ReactNode;
}

const StyledComponentProvider = ({ children }: Props) => {
  const [isDarkMode] = useAtom(isDarkModeAtom);

  return (
    <Registry>
      <ThemeProvider theme={isDarkMode ? theme.dark : theme.light}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Registry>
  );
};

export default StyledComponentProvider;
