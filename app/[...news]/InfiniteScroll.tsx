"use client"; // This designates the component as a client component
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Use next/navigation for routing
import { getNews } from "./lib";
import { News } from "@/types";
import Post from "./post";

type InfiniteScrollProps = {
  currentPage: number;
  hasNextPage: boolean;
};

export default function InfiniteScroll({
  currentPage,
  hasNextPage,
}: InfiniteScrollProps) {
  const router = useRouter();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["news", currentPage], // Use currentPage as part of the queryKey to differentiate queries by page number
    queryFn: getNews,
    initialPageParam: currentPage, // Initialize with the current page
    getNextPageParam: (lastPage) => lastPage.nextPage, // Define how to get the next page number
  });

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage(); // Trigger loading of the next page data
      const nextPage = currentPage + 1;

      // Update the URL to reflect the next page without refreshing the page
      router.push(`/news/page/${nextPage}`);
    }
  };

  return (
    <>
      {hasNextPage ? (
        <button onClick={handleNextPage} className="my-4">
          Load more
        </button>
      ) : (
        <noscript>
          <button className="my-4">Next Page</button>
        </noscript>
      )}

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.results.map(
            (item: News["results"]["data"][number], index: number) => (
              <Post key={item._id} index={index} post={item} />
            )
          )}
        </div>
      ))}
    </>
  );
}
