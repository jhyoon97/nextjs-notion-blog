import styled from "styled-components";

import { commonBox } from "../common/styles";

const Wrapper = styled.div`
  ${commonBox}
  margin: 1rem 0;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.contents.border};
`;

const Divider = () => {
  return (
    <Wrapper>
      <DividerLine />
    </Wrapper>
  );
};

export default Divider;
