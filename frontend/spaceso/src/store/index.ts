import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import uiReducer from './reducers/uiReducers';
import articlesReducer from './reducers/articlesReducer';
import articleReducer from './reducers/articleReducer';
import authReducer from './reducers/authReducer';
import newsReducer from './reducers/newsReducer';
import newsListReducer from './reducers/newsListReducer';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    news: newsReducer,
    newsList: newsListReducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;