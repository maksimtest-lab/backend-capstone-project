import type { Routes } from "../types/route";
import { FaFire } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";

export const ROUTES: Routes = {
    HOME: {url: '/', name: 'Home', icon: FaFire},
    ARTICLES: {url: '/articles', name: 'Articles', icon: FaRegImage},
    ARTICLES_PAGE: {url: '/articles/page/:page', name: 'Articles Page', icon: FaRegImage},
    ARTICLE: {url: '/article/:slug/', name: 'Article', icon: FaRegImage},
    NEWSLIST: {url: '/news', name: 'News', icon: FaNewspaper},
    NEWS: {url: '/news/:slug/', name: 'News', icon: FaNewspaper},
    NEWSLIST_PAGE: {url: '/news/page/:page', name: 'News Page', icon: FaNewspaper},
    SETTINGS: {url: '/settings', name: 'Settings', icon: FaCog},
    LOGIN: {url: '/login', name: 'Login'},
    REGISTRATION: {url: '/registration', name: 'Registration'},
    LOGOUT: {url: '/logout', name: 'Logout'},
    PROFILE: {url: '/profile', name: 'Profile'},
    // TODOS_CATEGORY: (category) => ({url: `/todos/${category}`, name: `Todos - ${category}`}),
};

export const NAVIGATION = [
    ROUTES.ARTICLES,
    ROUTES.NEWSLIST
];
