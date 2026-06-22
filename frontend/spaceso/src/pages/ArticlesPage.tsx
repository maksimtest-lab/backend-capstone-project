import { Navigation } from "../components";
import { useDispatch } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import { setPageTitle, setBreadcrumbs } from '../store/actions/actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchArticles } from '../store/actions/actions';
import type { ArticlesState } from '../types/articles';
import { ItemsList } from "../components/itemsList";
import { ROUTES } from "../consts/routes";
import Pagination from "../components/pagination";
import { useParams } from 'react-router-dom';

export function ArticlesPage() {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const articlesState = useSelector((state: RootState): ArticlesState => state.articles || { items: [], error: null, loading: false });
    const search = useSelector((state: RootState) => state.ui.search);
 
    const { page } = useParams<{ page: string }>() || { page: "1" };  

    useEffect(() => {
        dispatch(setPageTitle('Articles'));
        dispatch(fetchArticles(null, Number(page), search));
        dispatch(setBreadcrumbs([]));
        // console.log(page);
    }, [dispatch, page, search]);



    if (articlesState.loading) {
        return <div>Loading articles...</div>;
    }

    if (articlesState.error) {
        return <div>Error: {articlesState.error}</div>;
    }

    return (
        <>
            <Navigation />
            <ItemsList items={articlesState.items} route={ROUTES.ARTICLE}/>
            <Pagination route={ROUTES.ARTICLES_PAGE} state={articlesState} />
        </>
    )
}