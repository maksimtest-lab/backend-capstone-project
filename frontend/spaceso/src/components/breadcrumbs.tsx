import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Route } from "../types/route";
import { NavLink } from "react-router-dom";
import "./breadcrumbs.sass"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function Breadcrumbs() {
    const breadcrumbs = useSelector((state: RootState) => state.ui.breadcrumbs);
    const theme = useSelector((state: RootState) => state.ui.theme);
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith('/article/') || location.pathname.startsWith('/registration') || location.pathname.startsWith('/login')) {
            setIsActive(true);
        }
    }, [location]);

    if (!isActive) {
        return;
    }

    return (
        
        <div className={`breadcrumbs ${theme}`}>
            {breadcrumbs.map((breadcrumb: Route, index: number) => (
                <div key={breadcrumb.url || ''}>
                    {index != breadcrumbs.length - 1 && (
                        <>
                            <NavLink to={breadcrumb.url || ''} title={breadcrumb.name} className={({ isActive })     => isActive ? 'breadcrumbsLinkActive' : 'breadcrumbsLink'}>{breadcrumb.name}</NavLink>
                            <span> / </span>
                        </>
                    )}
                    {index == breadcrumbs.length - 1 && (
                        <span>{breadcrumb.name}</span>
                    )}
                </div>
            ))}
        </div>
    )
}