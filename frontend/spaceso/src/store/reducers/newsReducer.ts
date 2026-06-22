import { AnyAction } from 'redux';
import { FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, SET_NEWS } from '../actions/actionTypes';
import type { NewsState } from '../../types/news';
// import type { Article } from '../../types/articles';

const initialState: NewsState = {
  item: null,
  error: null,
  loading: false
};

export default function newsReducer(
  state: NewsState = initialState, 
  action: AnyAction
): NewsState {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_NEWS:
      return {
        ...state,
        loading: true
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false
      };

    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}