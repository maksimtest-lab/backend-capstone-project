import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { Article } from '../types/articles'
import { getArticleDate } from '../helpers' 
import { NavLink } from 'react-router-dom'
import type { Route } from '../types/route'
import "./itemCard.sass"

interface ItemCardProps {
    item: Article;
    route: Omit<Route, 'url'> & { url: string }; // Make url required for ItemCard
}

export default function ItemCard({ item, route }: ItemCardProps) {
    const theme = useSelector((state: RootState) => state.ui.theme);

    return (
        <div className={`itemCard ${theme}`}>
            <NavLink to={route.url.replace(":slug", item.slug.toString())}>
                <div className="itemCardImage" style={{ backgroundImage: `url(${item.cover_image})` }}></div>
                <div className="itemCardContent">
                    <div className="itemCardDate">{getArticleDate(item.published_at)}</div>
                    <h2 className="itemCardTitle">{item.title}</h2>
                </div>  
            </NavLink>
        </div>
    )
}