import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./newsPage.sass"
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { NewsState } from "../types/news";
import { fetchNews } from "../store/actions/actions";
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import Socials from "../components/socials";
import Backlink from "../components/backlink";

export function NewsPage() {

    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const NewsState = useSelector((state: RootState): NewsState => state.news || { item: null, error: null, loading: false });
    const news = NewsState.item;
    const theme = useSelector((state: RootState) => state.ui.theme);


    useEffect(() => {

        // if (news) {
        //     dispatch(setArticle(null));
        // }

        dispatch(fetchNews(slug!));

    }, [dispatch, slug]);

    
    if (NewsState.loading) {
        return <div>Loading news...</div>;
    }

    if (NewsState.error) {
        return <div>Error: {NewsState.error}</div>;
    }

    return (
        <div className={`${theme} newsPage`}>
            {news && (
                <>
                <div className="newsPageImage">
                    <img 
                        src={news.cover_image}
                        alt={news.title} 
                        className="newsImage"
                    />
                </div>
                <div className="newsPageContent">

                    <p className="newsContent" dangerouslySetInnerHTML={{ __html: news.content }} />
                    {news.source && (
                        <div className="source">
                            <br />
                            Source: <a href={news.source_link} target="_blank" rel="noopener noreferrer">
                                {news.source_link}
                            </a>
                            <br />
                            <br />
                        </div>
                    )}
                    
                    <Socials />
                </div>

                <Backlink />
                </>
            )}
        </div>
    )
}