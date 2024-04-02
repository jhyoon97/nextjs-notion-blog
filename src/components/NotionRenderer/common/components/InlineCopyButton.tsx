import styled from "styled-components";
import { LuLink } from "react-icons/lu";

interface Props {
  lineHeight: number;
  hash: string;
}

const Wrapper = styled.button<{ $height: number }>`
  display: none;
  position: absolute;
  top: 50%;
  left: 0;
  padding-right: 10px;
  transform: translate(-100%, -50%);
  height: ${({ $height }) => $height}em;
`;

const InlineCopyButton = ({ lineHeight, hash }: Props) => {
  return (
    <Wrapper
      className="inline-copy-button"
      $height={lineHeight}
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.href.split("#")[0]}#${hash}`
        );

        alert("URL이 복사되었습니다.");
      }}
    >
      <LuLink size={18} />
    </Wrapper>
  );
};

export default InlineCopyButton;
