import "./itemsList.sass"
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { Article } from '../types/articles'
import ItemCard from './itemCard'
import type { Route } from '../types/route'

interface ItemsListProps {
    items: Article[];
    route: Route;
}

export function ItemsList({ items, route }: ItemsListProps) {
    const theme = useSelector((state: RootState) => state.ui.theme);
    
    // Only render items if the route has a URL
    if (!route.url) {
        console.warn('ItemsList received a route without a URL');
        return null;
    }


    return (
        <div className={`itemsList ${theme}`}>
            {items.map((item: Article) => (
                <ItemCard key={item.slug} item={item} route={route as Route & { url: string }} />
            ))}
        </div>
    );
}