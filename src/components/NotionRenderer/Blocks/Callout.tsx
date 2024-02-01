import styled, { useTheme } from "styled-components";
import Image from "next/image";

import type { HasChildrenCallout } from "@/types/notion";
import NotionRenderer from "@/components/NotionRenderer";
import constants from "@/utils/constants";

import RichText from "../common/components/RichText";
import ExpirableImage from "../common/components/ExpirableImage";
import { commonBox } from "../common/styles";
import { LINE_HEIGHT } from "../common/constants";

interface Props {
  block: HasChildrenCallout;
}

const Wrapper = styled.div`
  ${commonBox}
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  width: ${LINE_HEIGHT}em;
  height: ${LINE_HEIGHT}em;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Callout = ({ block }: Props) => {
  const theme = useTheme();

  return (
    <Wrapper
      style={{
        color: (() => {
          if (block.callout.color.endsWith("background")) {
            return "inherit";
          }

          if (block.callout.color === "default") {
            return theme.contents.text;
          }

          return theme.notion[block.callout.color];
        })(),
        backgroundColor: (() => {
          if (
            block.callout.color !== "default" &&
            block.callout.color.endsWith("background")
          ) {
            return theme.notion[block.callout.color];
          }

          return "transparent";
        })(),
        border: `1px solid ${
          block.callout.color.endsWith("background")
            ? "transparent"
            : theme.contents.border
        }`,
      }}
    >
      {block.callout.icon && (
        <IconBox>
          {(() => {
            switch (block.callout.icon.type) {
              case "emoji":
                return <i>{block.callout.icon.emoji}</i>;
              case "external":
                return (
                  <Image
                    src={block.callout.icon.external.url}
                    width={constants.rootFontSize * 1.6}
                    height={constants.rootFontSize * 1.6}
                    loading="lazy"
                    alt=""
                  />
                );
              case "file":
                return (
                  <ExpirableImage
                    blockId={block.id}
                    src={block.callout.icon.file.url}
                    expiryTime={block.callout.icon.file.expiry_time}
                    width={constants.rootFontSize * 1.6}
                    height={constants.rootFontSize * 1.6}
                    wrapperStyle={{ borderRadius: 3, overflow: "hidden" }}
                    loading="lazy"
                    alt=""
                  />
                );
              default:
                return null;
            }
          })()}
        </IconBox>
      )}
      <ContentWrapper>
        <RichText richText={block.callout.rich_text} />

        {block.callout.children && (
          <NotionRenderer blocks={block.callout.children} />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Callout;
