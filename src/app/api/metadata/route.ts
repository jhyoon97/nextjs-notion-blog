import { NextResponse } from "next/server";
import getMetaData from "open-graph-scraper";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url") || "";

    const response = await getMetaData({ url });

    if (response.error) {
      throw new Error();
    }

    return NextResponse.json(
      {
        title: response.result.ogTitle,
        description: response.result.ogDescription,
        favicon:
          response.result.favicon?.startsWith("/") && response.result.ogUrl
            ? (() => {
                const scheme = /^([a-z0-9]+):\/\//.exec(
                  response.result.ogUrl
                )?.[0];
                const host = new URL(response.result.ogUrl).hostname;

                return scheme + host + response.result.favicon;
              })()
            : response.result.favicon,
        image: response.result.ogImage?.[0].url,
      },
      { status: 200 }
    );
  } catch (err) {
    return new Response("ERROR", { status: 403 });
  }
};
