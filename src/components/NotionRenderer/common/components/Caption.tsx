import styled from "styled-components";

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

import RichText from "./RichText";
import { commonBox } from "../styles";

interface Props {
  richText: Array<RichTextItemResponse>;
}

const Wrapper = styled.figcaption`
  ${commonBox}
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.caption};
  font-size: 0.9rem;
  text-align: center;
`;

const Caption = ({ richText }: Props) => {
  return (
    <Wrapper>
      <RichText richText={richText} />
    </Wrapper>
  );
};

export default Caption;
