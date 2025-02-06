"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNews } from "./lib";
import Post from "./post";

import { title } from "@/components/primitives";
import { News } from "@/types";

export default function Page() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: getNews,
    initialPageParam: 1, // Set the initial page param to 1
    getNextPageParam: (lastPage) => lastPage.nextPage, // Get the next page parameter
  });

  return (
    <div>
      <h1 className={title()}>News</h1>
      <div className="flex flex-col gap-1 my-4">
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.results.map((item: News['results']['data'][number], index: number) => (
              <Post key={item._id} index={index} post={item} />
            ))}
          </div>
        ))}
      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="my-4">
          Load more
        </button>
      )}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data.</div>}
    </div>
  );
}
