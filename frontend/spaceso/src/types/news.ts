interface News {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  cover_image: string;
  // news_site: string;
  content: string;
  published_at: string;
  updated_at?: string;
  // featured: boolean;
  // launches: any[];
  // events: any[];
  tags: any[];
  category: any[];
  views: number;
  source: string;
  source_link: string;
  author?: {
    name: string;
    socials?: {
      youtube?: string;
      facebook?: string;
      instagram?: string;
      x?: string;
      linkedin?: string;
      mastodon?: string;
      bluesky?: string;
    } | null;
  }[];
}

interface NewsListState {
  items: News[];
  count: number;
  page: number;
  prev: string | null;
  next: string | null;
  error: string | null;
  loading: boolean;
}

interface NewsState {
  item: News | null;
  error: string | null;
  loading: boolean;
}


export type { News, NewsListState, NewsState };