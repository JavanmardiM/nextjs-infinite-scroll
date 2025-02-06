"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getNews } from "./lib";
import Post from "./post";
import { useParams, useRouter } from "next/navigation";
import { title } from "@/components/primitives";
import { News } from "@/types";
import { useEffect, useCallback } from "react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { ref, inView } = useInView();

  const currentPage = Array.isArray(params.news)
    ? parseInt(params.news[2]) || 1
    : 1;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: getNews,
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
      const nextPage = currentPage + 1;

      router.push(`/news/page/${nextPage}`, { scroll: false });
    }
  }, [hasNextPage, fetchNextPage, currentPage, router]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (inView && hasNextPage && !isLoading) {
      timeout = setTimeout(() => {
        handleNextPage();
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [inView, hasNextPage, isLoading, handleNextPage]);

  return (
    <div>
      <h1 className={title()}>News</h1>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.results.map(
            (item: News["results"]["data"][number], index: number) => (
              <div key={item._id} className="flex flex-col gap-1 my-4">
                <Post index={index} post={item} />
              </div>
            )
          )}
        </div>
      ))}

      {hasNextPage ? (
        <div ref={ref} className="h-10">
          در حال بارگذاری ...
        </div>
      ) : (
        <noscript>
          <button className="my-4">صفحه بعد</button>
        </noscript>
      )}

      {isLoading && <div>در حال بارگذاری ...</div>}
      {isError && <div>Error loading data.</div>}
    </div>
  );
}
