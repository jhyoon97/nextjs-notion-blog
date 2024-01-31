import { NextResponse } from "next/server";
import getMetaData from "open-graph-scraper";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "";

  const response = await getMetaData({ url });

  return NextResponse.json(response.result, { status: 200 });
};
