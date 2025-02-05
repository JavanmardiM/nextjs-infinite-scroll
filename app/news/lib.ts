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

async function getNews({ page = 1 }: { page?: number } = {}) {
  const response = await _fetch(`/news/catalog?page=${page}`);

  return (await response.json()) as News;
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
