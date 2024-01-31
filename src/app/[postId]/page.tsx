import notionServices from "@/services/notion";

import PostDetail from "./PostDetail";

export const generateStaticParams = async () => {
  const data = await notionServices.getList();

  return data.map((item: any) => ({ postId: item.id }));
};

const Page = async ({ params }: { params: { postId: string } }) => {
  const data = await notionServices.getPage(params.postId);

  return <PostDetail data={data} />;
};

export default Page;
