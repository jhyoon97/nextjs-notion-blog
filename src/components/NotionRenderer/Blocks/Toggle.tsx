import styled from "styled-components";

// types
import type { HasChildrenToggle } from "@/types/notion";

import ToggleOuter from "../common/components/ToggleOuter";
import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";

interface Props {
  block: HasChildrenToggle;
  depth: number;
}

const Wrapper = styled.div`
  ${commonBox}
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const TextBox = styled.div`
  flex: 1;
`;

const Toggle = ({ block, depth }: Props) => {
  return (
    <Wrapper>
      <ToggleOuter
        childrenBlocks={block.toggle.children}
        isToggleable
        depth={depth}
      >
        <TextBox>
          <RichText richText={block.toggle.rich_text} />
        </TextBox>
      </ToggleOuter>
    </Wrapper>
  );
};

export default Toggle;
