import { NextResponse } from "next/server";

import notionServices from "@/services/notion";

export const GET = async (
  req: Request,
  { params }: { params: { blockId: string } }
) => {
  const { blockId } = params;

  const response = await notionServices.getBlock(blockId);

  return NextResponse.json(response, { status: 200 });
};
