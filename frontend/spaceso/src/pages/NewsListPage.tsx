import { Navigation } from "../components";
import { useDispatch } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import { setPageTitle, setBreadcrumbs } from '../store/actions/actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchNewsList } from '../store/actions/actions';
import type { NewsListState } from '../types/news';
import { ItemsNewsList } from "../components/itemsNewsList";
import { ROUTES } from "../consts/routes";
import Pagination from "../components/pagination";
import { useParams } from 'react-router-dom';

export function NewsListPage() {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const newsListState = useSelector((state: RootState): NewsListState => state.newsList || { items: [], error: null, loading: false });
    const search = useSelector((state: RootState) => state.ui.search);
 
    const { page } = useParams<{ page: string }>() || { page: "1" };  

    useEffect(() => {
        dispatch(setPageTitle('News'));
        dispatch(fetchNewsList(null, Number(page), search));
        dispatch(setBreadcrumbs([]));
    }, [dispatch, page, search]);

    if (newsListState.loading) {
        return <div>Loading news...</div>;
    }

    if (newsListState.error) {
        return <div>Error: {newsListState.error}</div>;
    }

    return (
        <>
            <Navigation />
            <ItemsNewsList items={newsListState.items} route={ROUTES.NEWS}/>
            <Pagination route={ROUTES.NEWSLIST_PAGE} state={newsListState} />
        </>
    )
}