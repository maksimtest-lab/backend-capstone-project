import "./itemsList.sass"
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { News } from '../types/news'
import ItemNewsCard from './itemNewsCard'
import type { Route } from '../types/route'

interface ItemsNewsListProps {
    items: News[];
    route: Route;
}

export function ItemsNewsList({ items, route }: ItemsNewsListProps) {
    const theme = useSelector((state: RootState) => state.ui.theme);

    // Only render items if the route has a URL
    if (!route.url) {
        console.warn('ItemsList received a route without a URL');
        return null;
    }

    return (
        <div className={`itemsList ${theme}`}>
            {items.map((item: News) => (
                <ItemNewsCard key={item.slug} item={item} route={route as Route & { url: string }} />
            ))}
        </div>
    );
}