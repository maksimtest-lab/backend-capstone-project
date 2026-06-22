import { AnyAction } from 'redux';
import { FETCH_NEWSLIST, FETCH_NEWSLIST_SUCCESS, FETCH_NEWSLIST_FAILURE } from '../actions/actionTypes';
import type { NewsListState } from '../../types/';

const initialState: NewsListState = {
  items: [],
  count: 0,
  page: 0,
  prev: null,
  next: null,
  error: null,
  loading: false
};

export default function newsListReducer(
  state: NewsListState = initialState, 
  action: AnyAction
): NewsListState {
  switch (action.type) {
    case FETCH_NEWSLIST:
      return {
        ...state,
        loading: true
      };

    case FETCH_NEWSLIST_SUCCESS:
      return {
        ...state,
        items: action.payload.results,
        count: action.payload.count,
        page: action.payload.page,
        prev: action.payload.prev,
        next: action.payload.next,
        loading: false
      };

    case FETCH_NEWSLIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}