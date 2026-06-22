import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./articlePage.sass"
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { ArticleState } from "../types/articles";
import { fetchArticle } from "../store/actions/actions";
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import Socials from "../components/socials";
import Backlink from "../components/backlink";

export function ArticlePage() {

    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const articleState = useSelector((state: RootState): ArticleState => state.article || { item: null, error: null, loading: false });
    const article = articleState.item;
    const theme = useSelector((state: RootState) => state.ui.theme);
    
    useEffect(() => {
        
        // if (article) {
        //     dispatch(setArticle(null));
        // }


        dispatch(fetchArticle(slug!));

    }, [dispatch, slug]);

    
    if (articleState.loading) {
        return <div>Loading article...</div>;
    }

    if (articleState.error) {
        return <div>Error: {articleState.error}</div>;
    }

    return (
        <div className={`${theme} articlePage`}>
            {article && (
                <>
                <div className="articlePageImage">
                    <img 
                        src={article.cover_image}
                        alt={article.title} 
                        className="articleImage"
                    />
                </div>
                <div className="articlePageContent">

                    <p className="articleContent" dangerouslySetInnerHTML={{ __html: article.content }} />
                    {article.source && (
                        <div className="source">
                            Source: <a href={article.source_link} target="_blank" rel="noopener noreferrer">
                                {article.source}
                            </a>
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