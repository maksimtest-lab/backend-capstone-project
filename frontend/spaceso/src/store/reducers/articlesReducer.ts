import { AnyAction } from 'redux';
import { FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE } from '../actions/actionTypes';
import type { ArticlesState } from '../../types/';

const initialState: ArticlesState = {
  items: [],
  count: 0,
  page: 0,
  prev: null,
  next: null,
  error: null,
  loading: false
};

export default function articlesReducer(
  state: ArticlesState = initialState, 
  action: AnyAction
): ArticlesState {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        loading: true
      };

    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        items: action.payload.results,
        count: action.payload.count,
        page: action.payload.page,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false
      };

    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}