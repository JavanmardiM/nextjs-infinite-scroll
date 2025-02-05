import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type News = {
  results: {
    current_page: number;
    data: Array<{
      _id: string;
      title: string;
      cover?: string;
      views: number;
      publish_date: string;
      content_summary: string;
      slug: string;
      reactions: {
        bullish: number;
        bearish: number;
        hype: number;
      };
      coin_tag: Array<{
        _id: string;
        name: string;
        slug: string;
        subject_id: string;
        category: string;
        icon: string;
      }>;
      authors: {
        created_by: {
          _id: string;
          name: string;
          username: string;
          usertag: string;
          avatar: any;
          about: any;
          role: Array<string>;
          title: string;
        };
        updated_by: {
          _id: string;
          name: string;
          username: string;
          usertag: string;
          avatar: any;
          about: any;
          role: Array<string>;
          title: string;
        };
      };
      source: {
        name: string;
        url: string;
        avatar: string;
      };
      categories: Array<{
        _id: string;
        title: string;
        slug: string;
        parent_id: any;
        taxonomy_id: number;
        seo: {
          title: string;
          desc: string;
          cover: any;
        };
        desc: any;
        updated_at: string;
        created_at: string;
        ads_slug: string;
      }>;
      disclaimer: boolean;
      edited_at: string;
      updated_at: string;
      created_at: string;
      created_at_human: string;
    }>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url?: string;
      label: string;
      active: boolean;
    }>;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: any;
    to: number;
    total: number;
  };
  paginated: boolean;
  iterable: boolean;
  status_code: number;
  api_version: any;
};

export type Fact = {
  fact: string;
  length: number;
};
