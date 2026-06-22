import type { IconType } from "react-icons";

export interface Route {
    url: string;
    name: string;
    icon?: IconType;
}

export interface Routes {
    HOME: Route;
    ARTICLES: Route;
    ARTICLES_PAGE: Route;
    NEWSLIST: Route;
    NEWS: Route;
    NEWSLIST_PAGE: Route;
    SETTINGS: Route;
    ARTICLE: Route;
    LOGIN: Route;
    REGISTRATION: Route;
    LOGOUT: Route;
    PROFILE: Route;
}
