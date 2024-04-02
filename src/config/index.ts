export default {
  apiHost: process.env.NEXT_PUBLIC_HOST || "",
  notion: {
    apiKey: process.env.NEXT_PUBLIC_NOTION_API_KEY || "",
    databaseId: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || "",
  },
  title: "nextjs-notion-blog-startkit",
};
