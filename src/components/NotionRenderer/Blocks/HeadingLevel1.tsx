import styled from "styled-components";

import type { HasChildrenToggleableHeading1 } from "@/types/notion";

import ToggleOuter from "../common/components/ToggleOuter";
import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  block: HasChildrenToggleableHeading1;
  depth: number;
}

const Wrapper = styled.div`
  ${commonBox}
  margin: 2rem 0 1rem;
  font-size: 1.6rem;
`;

const Heading = styled.h3`
  flex: 1;
  font-weight: bold;
`;

const Anchor = styled.div`
  display: hidden;
  position: relative;
  top: -90px;
`;

const HeadingLevel1 = ({ block, depth }: Props) => {
  // 헤더에서 h1태그, 타이틀에서 h2 태그 사용중이므로 h3태그 사용

  return (
    <Wrapper>
      <Anchor id={block.id} />
      <ToggleOuter
        childrenBlocks={block.heading_1.children}
        isToggleable={block.heading_1.is_toggleable}
        depth={depth}
      >
        <Heading>
          <RichText richText={block.heading_1.rich_text} />
        </Heading>
      </ToggleOuter>
    </Wrapper>
  );
};

export default HeadingLevel1;
