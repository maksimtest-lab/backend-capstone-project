import { SET_PAGE_TITLE, SET_THEME, SET_USERNAME, SET_SEARCH, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE, SET_BREADCRUMBS, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE, SET_ARTICLE, LOGIN, LOGOUT, REGISTRATION, GET_AUTH_STATE, SET_NEWS, FETCH_NEWS_FAILURE, FETCH_NEWS_SUCCESS, FETCH_NEWSLIST_FAILURE, FETCH_NEWSLIST_SUCCESS, TOGGLE_MENU } from './actionTypes';
import { API_ARTICLE_URL, API_ARTICLES_URL, API_NEWS_URL, API_NEWSLIST_URL } from '../../consts/api';
import axios from 'axios';
import type { Article } from '../../types/articles';
import type { News } from '../../types/news';
import type { Route } from '../../types/route';
import type { RootState } from '../../store';
import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';

import { API_TOKEN_URL } from "../../consts/api";

export const setPageTitle = (title: string) => {
  return {
    type: SET_PAGE_TITLE,
    payload: title
  };
};

export const setTheme = (theme: 'light' | 'dark') => {
  return {
    type: SET_THEME,
    payload: theme
  };
};

export const setUsername = (username: string) => {
  return {
    type: SET_USERNAME,
    payload: username
  };
};

export const setSearch = (search: string) => {
  return {
    type: SET_SEARCH,
    payload: search
  };
};

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

export const setBreadcrumbs = (breadcrumbs: Route[]) => {
  return {
    type: SET_BREADCRUMBS,
    payload: breadcrumbs
  };
};

export const fetchArticlesSuccess = (articles: Article[]) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles
});

export const fetchArticlesFailure = (error: string) => ({
    type: FETCH_ARTICLES_FAILURE,
    payload: error
});

export const fetchArticles = (url: string | null, page: number | null = null, search: string | null = null) => {
  return async (dispatch: any) => {
    let fetchUrl = url || API_ARTICLES_URL;

    if (page) {
      if (typeof page === 'number') {
        const offset = (page - 1) * 12;
        fetchUrl += `&page=${page}`;
      }
    }
    
    if (search) {
      fetchUrl += `&search=${search}`;
    }
    
    try {
        const response = await axios.get(fetchUrl);
        dispatch(fetchArticlesSuccess(response.data));
    } catch (error) {
      console.error('Error fetching articles:', error);
      dispatch(fetchArticlesFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchArticleSuccess = (article: Article) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload: article
});

export const fetchArticleFailure = (error: string) => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: error
});

export const fetchArticle = (slug) => {
  return async (dispatch: any) => {
    dispatch(setArticle(null));
    
    try {
      const response = await axios.get(API_ARTICLE_URL.replace(':slug', slug));
      dispatch(fetchArticleSuccess(response.data));
      dispatch(setBreadcrumbs([
        {url: '/', name: 'Home'},
        {url: '/articles', name: 'Articles'},
        {url: `/article/${slug}/`, name: response.data.title ? `${response.data.title.slice(0, 40)}...` : 'Article'}
      ]));
      dispatch(setPageTitle(response.data.title || 'Article Page'));
    } catch (error) {
      console.error('Error fetching article:', error);
      dispatch(fetchArticleFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const setArticle = (article: Article | null) => {
  return {
    type: SET_ARTICLE,
    payload: article
  };
};

export const login = (username: string, password: string) => async (dispatch) => {
  try {
    const response = await axios.post(API_TOKEN_URL, {
      username,
      password,
    });

    const { access, refresh } = response.data;

    // сохраняем токены
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    dispatch({
      type: LOGIN,
      payload: {
        isAuthenticated: true,
        user: { username },
        error: null,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN,
      payload: {
        isAuthenticated: false,
        user: null,
        error: "Invalid username or password",
      },
    });
  }
};

export const registration = (email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
      
      dispatch({
        type: REGISTRATION,
        payload: {
          isAuthenticated: true,
          user: {
            uid,
            email: userEmail,
            displayName,
            photoURL
          },
          error: null
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({
        type: REGISTRATION,
        payload: {
          isAuthenticated: false,
          user: null,
          error: error instanceof Error ? error.message : 'Registration failed'
        }
      });
      throw error;
    }
  };

export const logout = ():
  ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    // 1. Удаляем токены
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // 2. Сбрасываем Redux состояние
    dispatch({
      type: LOGOUT,
      payload: {
        isAuthenticated: false,
        user: null,
        error: null,
      },
    });
  };


  export const getAuthState = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => 
    async (dispatch) => {
      // try {
      //   // This will be called by the onAuthStateChanged listener
      //   const user = auth.currentUser;
        
      //   if (user) {
      //     const { uid, email, displayName, photoURL } = user;
      //     dispatch({
      //       type: GET_AUTH_STATE,
      //       payload: {
      //         isAuthenticated: true,
      //         user: {
      //           uid,
      //           email,
      //           displayName,
      //           photoURL
      //         },
      //         error: null
      //       }
      //     });
      //   } else {
      //     dispatch({
      //       type: GET_AUTH_STATE,
      //       payload: {
      //         isAuthenticated: false,
      //         user: null,
      //         error: null
      //       }
      //     });
      //   }
      // } catch (error) {
      //   console.error('Error getting auth state:', error);
      //   dispatch({
      //     type: GET_AUTH_STATE,
      //     payload: {
      //       isAuthenticated: false,
      //       user: null,
      //       error: error instanceof Error ? error.message : 'An unknown error occurred'
      //     }
      //   });
      // }
    };      

export const updateUsername = (username: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    // try {
    //   const user = auth.currentUser;
    //   if (user) {
    //     dispatch({
    //       type: GET_AUTH_STATE,
    //       payload: {
    //         isAuthenticated: true,
    //         user: {
    //           uid: user.uid,
    //           email: user.email,
    //           displayName: username,
    //           photoURL: user.photoURL
    //         },
    //         error: null
    //       }
    //     });
    //   }
    // } catch (error) {
    //   console.error('Error updating username:', error);
    //   dispatch({
    //     type: GET_AUTH_STATE,
    //     payload: {
    //       isAuthenticated: false,
    //       user: null,
    //       error: error instanceof Error ? error.message : 'An unknown error occurred'
    //     }
    //   });
    // }
};

// News

export const fetchNewsListSuccess = (articles: News[]) => ({
  type: FETCH_NEWSLIST_SUCCESS,
  payload: articles
});

export const fetchNewsListFailure = (error: string) => ({
    type: FETCH_NEWSLIST_FAILURE,
    payload: error
});

export const fetchNewsList = (url: string | null, page: number | null = null, search: string | null = null) => {
  return async (dispatch: any) => {
    let fetchUrl = url || API_NEWSLIST_URL;
    
    if (page) {
      if (typeof page === 'number') {
        // const offset = (page - 1) * 12;
        fetchUrl += `&page=${page}`;
      }
    }
    
    if (search) {
      fetchUrl += `&search=${search}`;
    }
    
    try {
        const response = await axios.get(fetchUrl);
        dispatch(fetchNewsListSuccess(response.data));
    } catch (error) {
      console.error('Error fetching articles:', error);
      dispatch(fetchNewsListFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchNewsSuccess = (news: News) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news
});

export const fetchNewsFailure = (error: string) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error
});

export const fetchNews = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setNews(null));
    console.log(slug);

    try {
      const response = await axios.get(API_NEWS_URL.replace(':slug', slug));
      dispatch(fetchNewsSuccess(response.data));
      dispatch(setBreadcrumbs([
        {url: '/', name: 'Home'},
        {url: '/news', name: 'News'},
        {url: `/news/${slug}`, name: response.data.title ? `${response.data.title.slice(0, 40)}...` : 'News'}
      ]));
      dispatch(setPageTitle(response.data.title || 'News Page'));      
    } catch (error) {
      console.error('Error fetching article:', error);
      dispatch(fetchNewsFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const setNews = (news: News | null) => {
  return {
    type: SET_NEWS,
    payload: news
  };
};
  