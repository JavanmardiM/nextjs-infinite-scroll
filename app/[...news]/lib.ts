import type { News } from "@/types";

async function _fetch(url: string) {
  const api = "https://feedbeen.com/api";
  const endpoint = api + url;

  return await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
}

async function getNews({ pageParam = 1 }: { pageParam?: number } = {}) {
  const response = await _fetch(`/news/catalog?page=${pageParam}`);
  const data = await response.json();

  return {
    results: data.results.data,
    nextPage: data.results.next_page_url ? pageParam + 1 : undefined,
  };
}

function pagination(response: News) {
  const hasNextPage = response.results.next_page_url !== null;
  const hasPrevPage = response.results.prev_page_url !== null;
  const nextPage = hasNextPage ? response.results.next_page_url : null;

  return {
    hasNextPage,
    hasPrevPage,
    nextPage,
  };
}

export { getNews, pagination };
