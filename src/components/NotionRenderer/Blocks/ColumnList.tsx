import styled from "styled-components";

import type { HasChildrenColumnList } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";

import { commonBox } from "../common/styles";

interface Props {
  block: HasChildrenColumnList;
}

const Wrapper = styled.div`
  ${commonBox}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ColumnWrapper = styled.div`
  flex-grow: 0;
  overflow: hidden;
`;

const ColumnList = ({ block }: Props) => {
  return (
    <Wrapper>
      {block.column_list.children &&
        block.column_list.children.map((column, _, array) => (
          <ColumnWrapper
            key={column.id}
            style={{ width: `calc((100% * (${1 / array.length}) - 1rem)` }}
          >
            <NotionRenderer blocks={column.column.children || []} />
          </ColumnWrapper>
        ))}
    </Wrapper>
  );
};

export default ColumnList;
