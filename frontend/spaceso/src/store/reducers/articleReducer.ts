import { AnyAction } from 'redux';
import { FETCH_ARTICLE, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE, SET_ARTICLE } from '../actions/actionTypes';
import type { ArticleState } from '../../types/';
// import type { Article } from '../../types/articles';

const initialState: ArticleState = {
  item: null,
  error: null,
  loading: false
};

export default function articleReducer(
  state: ArticleState = initialState, 
  action: AnyAction
): ArticleState {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        loading: true
      };

    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false
      };

    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}