import type { CSSProperties } from "react";
import type { ImageProps } from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { isFullBlock } from "@notionhq/client";
import Image from "next/image";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";

// types
import type {
  ImageBlockObjectResponse,
  CalloutBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface Props extends Omit<ImageProps, "src"> {
  wrapperStyle?: CSSProperties;
  blockId: string;
  src: string;
  expiryTime: string;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;

  & .skeleton-container {
    width: 100%;
  }
`;

const SKELETON_HEIGHT = 150;

const ExpirableImage = ({
  wrapperStyle,
  blockId,
  src,
  expiryTime,
  ...imageProps
}: Props) => {
  const [imageURL, setImageURL] = useState(src);
  const [blockReloadState, setBlockReloadState] = useState<
    null | "LOADING" | "SUCCESS" | "FAILURE" | "NOT_REQUIRED"
  >(null);
  const [imageLoading, setImageLoading] = useState(true);

  const refetchBlock = async () => {
    // 1회에 한하여 블록 리로드
    if (blockReloadState !== "FAILURE") {
      setBlockReloadState("LOADING");

      try {
        const response = await fetch(`/api/block/${blockId}`);
        const newBlock: ImageBlockObjectResponse | CalloutBlockObjectResponse =
          await response.json();

        if (isFullBlock(newBlock)) {
          if (newBlock.type === "image" && newBlock.image.type === "file") {
            setImageURL(newBlock.image.file.url);
            setBlockReloadState("SUCCESS");
          } else if (
            newBlock.type === "callout" &&
            newBlock.callout.icon?.type === "file"
          ) {
            setImageURL(newBlock.callout.icon.file.url);
            setBlockReloadState("SUCCESS");
          } else {
            setBlockReloadState("FAILURE");
          }
        }
      } catch (err) {
        console.log(err);
        setBlockReloadState("FAILURE");
      }
    }
  };

  useEffect(() => {
    if (dayjs().isAfter(dayjs(expiryTime), "seconds")) {
      refetchBlock();
    } else {
      setBlockReloadState("NOT_REQUIRED");
    }
  }, []);

  return (
    <Wrapper
      className="expirable-image"
      style={{
        width: imageProps.width || "100%",
        height: imageProps.height || (imageLoading ? SKELETON_HEIGHT : "100%"),
        ...wrapperStyle,
      }}
    >
      {(() => {
        switch (blockReloadState) {
          case "LOADING":
            return (
              <Skeleton
                containerClassName="skeleton-container"
                style={{ position: "absolute", top: 0, left: 0 }}
                width={imageProps.width || "100%"}
                height={imageProps.height || SKELETON_HEIGHT}
              />
            );
          case "NOT_REQUIRED":
          case "SUCCESS":
            return (
              <>
                {imageLoading && (
                  <Skeleton
                    containerClassName="skeleton-container"
                    style={{ position: "absolute", top: 0, left: 0 }}
                    width={imageProps.width || "100%"}
                    height={imageProps.height || SKELETON_HEIGHT}
                  />
                )}
                <Image
                  {...imageProps}
                  src={imageURL}
                  onLoadingComplete={() => setImageLoading(false)}
                />
              </>
            );
          case "FAILURE":
            return null;
          default:
            return null;
        }
      })()}
    </Wrapper>
  );
};

export default ExpirableImage;
