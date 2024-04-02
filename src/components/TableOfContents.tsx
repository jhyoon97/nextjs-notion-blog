import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";

import useScroll from "@/hooks/useScroll";
import utils from "@/utils";
import { tableOfContentsAtom } from "@/atoms/tableOfContents";

import type { TableOfContentsInterface } from "@/types/app";
import type { HasChildrenBlockObject } from "@/types/notion";

interface Props {
  blocks: Array<HasChildrenBlockObject>;
}

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

const TableOfContents = ({ blocks }: Props) => {
  const [focusHeadingId, setFocusHeadingId] = useState("");
  const [tableOfContents, setTableOfContents] = useAtom(tableOfContentsAtom);

  useEffect(() => {
    setTableOfContents(
      blocks.reduce<TableOfContentsInterface>((acc, block) => {
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
  }, [blocks]);

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
