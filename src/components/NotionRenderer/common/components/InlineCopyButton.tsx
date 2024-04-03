import styled from "styled-components";
import { LuLink } from "react-icons/lu";

import constants from "@/utils/constants";

import { LINE_HEIGHT } from "../constants";

interface Props {
  hash: string;
}

const Wrapper = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 5px;
  transform: translateX(-100%);
  height: ${LINE_HEIGHT}em;

  ${constants.mediaQuery.isTablet} {
    padding: 0 1px;
  }
`;

const InlineCopyButton = ({ hash }: Props) => {
  return (
    <Wrapper
      className="inline-copy-button"
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.href.split("#")[0]}#${hash}`
        );

        alert("URL이 복사되었습니다.");
      }}
    >
      <LuLink size={16} />
    </Wrapper>
  );
};

export default InlineCopyButton;
