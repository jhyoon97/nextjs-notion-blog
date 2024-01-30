"use client";

import { ThemeProvider } from "styled-components";

import Registry from "@/utils/styled/Registry";
import GlobalStyles from "@/utils/styled/GlobalStyle";
import theme from "@/utils/styled/theme";

interface Props {
  children: React.ReactNode;
}

const StyledComponentProvider = ({ children }: Props) => {
  return (
    <Registry>
      <ThemeProvider theme={theme.light}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Registry>
  );
};

export default StyledComponentProvider;
