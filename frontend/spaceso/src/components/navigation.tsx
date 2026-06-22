import { NavLink } from "react-router-dom";
import { NAVIGATION, ROUTES } from "../consts/routes";
import type { NavigationItem } from "../types/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLocation } from "react-router-dom";
import "./navigation.sass";

export function Navigation() {
    const theme = useSelector((state: RootState) => state.ui.theme)
    const currentPath = useLocation().pathname;

    return (    
        <div className={`navigation ${theme}`}>
            <nav>
                <ul>
                    {NAVIGATION.map((route: NavigationItem) => (
                        <li key={route.url}>
                            <NavLink to={route.url} className={({ isActive }) => isActive || currentPath === "/" && route.url === ROUTES.ARTICLES.url ? 'active' : ''}>
                                {/* {route.icon && <route.icon className="nav-icon" />} */}
                                {route.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}