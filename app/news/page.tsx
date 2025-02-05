export const revalidate = 1;

import { getNews } from "./lib";
import Post from "./post";

import { title } from "@/components/primitives";

export default async function Page() {
  const { results: news } = await getNews();

  return (
    <div>
      <h1 className={title()}>News</h1>
      <div className="flex flex-col gap-1 my-4">
        {news.data.map((item, index) => (
          <Post key={item._id} index={index} post={item} />
        ))}
      </div>
    </div>
  );
}
