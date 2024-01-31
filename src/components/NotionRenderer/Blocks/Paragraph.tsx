import styled from "styled-components";

import type { HasChildrenParagraph } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  block: HasChildrenParagraph;
  depth: number;
}

const Text = styled.p`
  ${commonBox}
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

const Paragraph = ({ block, depth }: Props) => {
  return (
    <>
      <Text>
        <RichText richText={block.paragraph.rich_text} />
      </Text>
      {block.paragraph.children && (
        <NotionRenderer blocks={block.paragraph.children} depth={depth + 1} />
      )}
    </>
  );
};

export default Paragraph;
