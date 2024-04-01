import notionServices from "@/services/notion";

import PostDetail from "./PostDetail";

export const revalidate = 3500;

export const generateStaticParams = async () => {
  const data = await notionServices.getList();

  return data.map((item) => ({ postId: item.postId }));
};

const Page = async ({ params }: { params: { postId: string } }) => {
  const data = await notionServices.getPage(params.postId);

  return <PostDetail data={data} />;
};

export default Page;
