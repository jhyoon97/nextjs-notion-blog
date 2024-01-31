import { useState, useEffect } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { OgObject } from "open-graph-scraper/dist/lib/types";

import Caption from "../common/components/Caption";
import { commonBox } from "../common/styles";

interface Props {
  block: BookmarkBlockObjectResponse;
}

const Wrapper = styled.div`
  ${commonBox}
`;

const BookmarkStyles = {
  Wrapper: styled.a`
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
    width: 100%;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.boxBorder};

    &:hover {
      background: ${({ theme }) => theme.hoverBackground};
    }

    & .skeleton-container {
      width: 100%;
    }

    & .skeleton-icon-container {
      line-height: 1;
    }
  `,
  TextBox: styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.9rem;
    overflow: hidden;
  `,
  TextBoxHeader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    overflow: hidden;
  `,
  Title: styled.span`
    width: 100%;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Description: styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.subText};
  `,
  UrlRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
  `,
  Icon: styled.img`
    margin-right: 6px;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: top;
  `,
  Url: styled.span`
    flex: 1;
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ThumbnailBox: styled.div`
    flex: 1;
    position: relative;
  `,
  Thumbnail: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

const IconSkeleton = styled(Skeleton)`
  ${BookmarkStyles.Icon};
`;

const Bookmark = ({ block }: Props) => {
  const [loading, setLoading] = useState<"LOADING" | "SUCCESS" | "FAILURE">(
    "LOADING"
  );
  const [thumbnailError, setThumbnailError] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [metadata, setMetadata] = useState<OgObject>({});

  useEffect(() => {
    if (block.bookmark.url) {
      (async () => {
        try {
          const response = await fetch(
            `/api/metadata?url=${encodeURI(block.bookmark.url)}`
          );
          const data: OgObject = await response.json();

          setMetadata(data);
          setLoading("SUCCESS");
        } catch (err) {
          setLoading("FAILURE");
          console.log(err);
        }
      })();
    }
  }, [block]);

  return (
    <Wrapper>
      <BookmarkStyles.Wrapper
        href={block.bookmark.url}
        target="_blank"
        rel="noreferrer"
      >
        <BookmarkStyles.TextBox>
          <BookmarkStyles.TextBoxHeader>
            {(() => {
              switch (loading) {
                case "LOADING":
                  return (
                    <Skeleton
                      containerClassName="skeleton-container"
                      count={1}
                    />
                  );
                case "SUCCESS":
                  return (
                    <BookmarkStyles.Title>
                      {metadata.ogTitle}
                    </BookmarkStyles.Title>
                  );
                default:
                  return /(?:[\w-]+\.)+[\w-]+/.exec(block.bookmark.url);
              }
            })()}

            {loading !== "LOADING" && metadata.ogDescription && (
              <BookmarkStyles.Description>
                {metadata.ogDescription}
              </BookmarkStyles.Description>
            )}
          </BookmarkStyles.TextBoxHeader>
          <BookmarkStyles.UrlRow>
            {loading === "LOADING" ? (
              <IconSkeleton
                containerClassName="skeleton-icon-container"
                style={{ lineHeight: 1 }}
              />
            ) : (
              metadata.favicon &&
              !iconError && (
                <BookmarkStyles.Icon
                  onError={() => setIconError(true)}
                  src={metadata.favicon}
                  loading="lazy"
                  alt=""
                />
              )
            )}
            <BookmarkStyles.Url>{block.bookmark.url}</BookmarkStyles.Url>
          </BookmarkStyles.UrlRow>
        </BookmarkStyles.TextBox>
        {loading !== "LOADING" &&
          metadata.ogImage?.[0].url &&
          !thumbnailError && (
            <BookmarkStyles.ThumbnailBox>
              <BookmarkStyles.Thumbnail
                onError={() => setThumbnailError(true)}
                src={metadata.ogImage[0].url}
                loading="lazy"
                alt=""
              />
            </BookmarkStyles.ThumbnailBox>
          )}
      </BookmarkStyles.Wrapper>
      {block.bookmark.caption.length > 0 && (
        <Caption richText={block.bookmark.caption} />
      )}
    </Wrapper>
  );
};

export default Bookmark;
