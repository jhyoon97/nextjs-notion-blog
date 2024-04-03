import { useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";

import useScroll from "@/hooks/useScroll";
import utils from "@/utils";
import { tableOfContentsAtom } from "@/atoms/tableOfContents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.button<{ $isFocused: boolean }>`
  text-align: left;
  transform-origin: 0 50%;
  transition: transform 0.1s ease-in;
  transform: scale(${({ $isFocused }) => ($isFocused ? 1.02 : 1)});

  ${({ theme, $isFocused }) =>
    $isFocused
      ? css`
          color: ${theme.tableOfContents.highlight};
        `
      : css`
          color: ${theme.tableOfContents.text};

          &:hover {
            color: ${theme.tableOfContents.hover};
          }
        `}
`;

const TableOfContents = () => {
  const [focusHeadingId, setFocusHeadingId] = useState("");
  const [tableOfContents] = useAtom(tableOfContentsAtom);

  useScroll(() => {
    for (let i = tableOfContents.length - 1; i >= 0; i -= 1) {
      const element = document.getElementById(
        utils.convertCleanedText(tableOfContents[i].text)
      );

      if (
        window.scrollY + (element?.getBoundingClientRect().y || 0) <=
          window.scrollY + 10 ||
        i === 0
      ) {
        setFocusHeadingId(tableOfContents[i].id);
        break;
      }
    }
  }, [tableOfContents]);

  return (
    <Wrapper>
      {tableOfContents.map((item) => (
        <Item
          type="button"
          key={item.id}
          $isFocused={focusHeadingId === item.id}
          style={{
            marginLeft: `${Number(item.type.replace("heading_", ""))}rem`,
          }}
          onClick={() => {
            const element = document.getElementById(
              utils.convertCleanedText(item.text)
            );

            window.scrollTo({
              top: window.scrollY + (element?.getBoundingClientRect().y || 0),
            });
          }}
        >
          {item.text}
        </Item>
      ))}
    </Wrapper>
  );
};

export default TableOfContents;
