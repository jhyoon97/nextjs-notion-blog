/* eslint-disable react/no-array-index-key */
import styled from "styled-components";

import type { HasChildrenTable } from "@/types/notion";

import RichText from "../common/components/RichText";
import { commonBox } from "../common/styles";
import { LINE_HEIGHT } from "../common/constants";

interface Props {
  block: HasChildrenTable;
}

const Wrapper = styled.div`
  ${commonBox}
  margin: 1rem 0;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border: 1px solid ${({ theme }) => theme.boxBorder};
`;

const Row = styled.tr<{ $isTitle: boolean }>`
  height: ${LINE_HEIGHT + 1}em;
  background: ${({ theme, $isTitle }) =>
    $isTitle ? theme.notion.gray_background : "unset"};
`;

const Cell = styled.td<{ $isTitle: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.boxBorder};
  font-size: 1rem;
  text-align: center;
  background: ${({ theme, $isTitle }) =>
    $isTitle ? theme.notion.gray_background : "unset"};
`;

const Table = ({ block }: Props) => {
  return (
    <Wrapper>
      <StyledTable>
        <tbody>
          {block.table.children &&
            block.table.children.map((row, rowIndex) => {
              return (
                <Row
                  key={row.id}
                  $isTitle={rowIndex === 0 && block.table.has_column_header}
                >
                  {row.table_row.cells.map((cell, cellIndex) => {
                    return (
                      <Cell
                        key={cellIndex}
                        $isTitle={cellIndex === 0 && block.table.has_row_header}
                      >
                        <RichText richText={cell} />
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

export default Table;
