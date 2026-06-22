const LIMIT = 12;
const BASE = import.meta.env.VITE_API_BASE || "";

const API_ARTICLES_URL = `${BASE}/api/v1/blog/posts/?limit=${LIMIT}`;
const API_ARTICLE_URL = `${BASE}/api/v1/blog/posts/:slug/`;

const API_NEWSLIST_URL = `${BASE}/api/v1/news/articles/?limit=${LIMIT}`;
const API_NEWS_URL = `${BASE}/api/v1/news/articles/:slug/`;



export { API_ARTICLES_URL, LIMIT, API_ARTICLE_URL, API_NEWSLIST_URL, API_NEWS_URL };
