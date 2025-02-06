"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNews } from "./lib";
import Post from "./post";
import { useParams, useRouter } from "next/navigation";
import { title } from "@/components/primitives";
import { News } from "@/types";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const currentPage = Array.isArray(params.news) ? parseInt(params.news[2]) : 1;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["news", currentPage],
    queryFn: getNews,
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
      const nextPage = currentPage + 1;

      router.push(`/news/page/${nextPage}`);
    }
  };

  return (
    <div>
      <h1 className={title()}>News</h1>
      <div className="flex flex-col gap-1 my-4">
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.results.map(
              (item: News["results"]["data"][number], index: number) => (
                <Post key={item._id} index={index} post={item} />
              )
            )}
          </div>
        ))}
      </div>

      {hasNextPage ? (
        <button onClick={handleNextPage} className="my-4">
          Load more
        </button>
      ) : (
        <noscript>
          <button className="my-4">Next Page</button>
        </noscript>
      )}

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data.</div>}
    </div>
  );
}
