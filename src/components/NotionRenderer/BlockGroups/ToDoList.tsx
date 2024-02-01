import React from "react";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";

import type { HasChildrenToDo } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";
import { LINE_HEIGHT } from "../common/constants";

interface Props {
  blocks: Array<HasChildrenToDo>;
  depth: number;
}

const Wrapper = styled.ul`
  ${commonBox}
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.5rem;
  width: 1rem;
  height: ${LINE_HEIGHT}em;
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const Checkbox = styled.i<{ $checked: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1rem;
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.contents.highlight : theme.contents.border};
  background: ${({ theme, $checked }) =>
    $checked ? theme.contents.highlight : "transparent"};
`;

const ToDoList = ({ blocks, depth }: Props) => {
  return (
    <Wrapper>
      {blocks.map((item) => (
        <React.Fragment key={item.id}>
          <Item>
            <CheckBoxWrapper>
              <Checkbox $checked={item.to_do.checked}>
                {item.to_do.checked && (
                  <BsCheck
                    color="#FFF"
                    size="18"
                    style={{ maxWidth: "unset" }}
                  />
                )}
              </Checkbox>
            </CheckBoxWrapper>
            <TextWrapper>
              <RichText richText={item.to_do.rich_text} />
            </TextWrapper>
          </Item>

          {item.to_do.children && (
            <NotionRenderer blocks={item.to_do.children} depth={depth + 1} />
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default ToDoList;
