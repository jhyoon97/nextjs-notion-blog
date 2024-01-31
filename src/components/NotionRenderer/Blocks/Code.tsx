import { useEffect } from "react";
import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";

// types
import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import Caption from "../common/components/Caption";
import { commonBox } from "../common/styles";

interface Props {
  block: CodeBlockObjectResponse;
}

const Wrapper = styled.figure`
  ${commonBox}
`;

const CodeWrapper = styled.pre`
  && {
    margin: 0.5rem 0;
  }
`;

const Code = ({ block }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Wrapper>
      <CodeWrapper>
        <code className={`language-${block.code.language}`}>
          {block.code.rich_text[0].plain_text}
        </code>
      </CodeWrapper>
      {block.code.caption.length > 0 && (
        <Caption richText={block.code.caption} />
      )}
    </Wrapper>
  );
};

export default Code;
