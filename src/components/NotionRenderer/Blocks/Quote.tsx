import styled from "styled-components";

import type { HasChildrenQuote } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  block: HasChildrenQuote;
}

const Wrapper = styled.div`
  ${commonBox}
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  border-left: 3px solid currentcolor;
`;

const Quote = ({ block }: Props) => {
  return (
    <Wrapper>
      <RichText richText={block.quote.rich_text} />

      {block.quote.children && (
        <NotionRenderer
          blocks={block.quote.children}
          style={{ marginTop: "0.5rem" }}
        />
      )}
    </Wrapper>
  );
};

export default Quote;
