import notionServices from "@/services/notion";

import PostList from "./PostList";

const Page = async () => {
  const postList = await notionServices.getList();

  return <PostList postList={postList} />;
};

export default Page;
