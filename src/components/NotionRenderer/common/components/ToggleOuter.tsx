import React, { useState } from "react";
import { BiCaretRight } from "react-icons/bi";
import styled from "styled-components";

import type { HasChildrenBlockObject } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import { LINE_HEIGHT } from "../constants";

interface Props {
  childrenBlocks?: Array<HasChildrenBlockObject>;
  isToggleable?: boolean;
  depth: number;
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ToggleButtonWrpper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: ${LINE_HEIGHT}em;
`;

const ToggleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  width: 100%;
  height: 1.5rem;
  border-radius: 3px;

  & > svg {
    transition: transform 0.3s;
  }

  &:hover {
    background: ${({ theme }) => theme.contents.bgHover};
  }
`;

const ChildrenWrapper = styled.div``;

const ToggleOuter = ({
  childrenBlocks,
  isToggleable,
  depth,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <TitleRow>
        {isToggleable && (
          <ToggleButtonWrpper>
            <ToggleButton type="button" onClick={() => setIsOpen(!isOpen)}>
              <BiCaretRight
                size="20"
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            </ToggleButton>
          </ToggleButtonWrpper>
        )}

        {children}
      </TitleRow>

      {childrenBlocks && isToggleable && isOpen && (
        <ChildrenWrapper>
          <NotionRenderer
            blocks={childrenBlocks}
            depth={depth + 1}
            style={{ marginTop: "0.5rem" }}
          />
        </ChildrenWrapper>
      )}
    </Wrapper>
  );
};

export default ToggleOuter;
