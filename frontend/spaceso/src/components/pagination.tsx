import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./pagination.sass"
import { NavLink, useParams } from "react-router-dom";
import type { Route } from "../types/route";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { ArticlesState } from "../types/articles";
import type { NewsListState } from "../types/news";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Pagination({ route, state }: { route: Route, state: ArticlesState | NewsListState }) {
    let { page } = useParams<{ page: string }>(); 
    const [totalPages, setTotalPages] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const dispatch = useDispatch();
    
    if (!page) {
        page = "1";
    }
    
    const theme = useSelector((state: RootState) => state.ui.theme);
    const nextPage = Number(page) + 1;
    const prevPage = Number(page) - 1 || 1;

    useEffect(() => {
        setTotalPages(Math.ceil(state.count / 12));
        setHasPrev(Number(page) > 1);
        setHasNext(Number(page) < totalPages);
    }, [dispatch, state, page, totalPages, hasPrev, hasNext]);
    
    if (!totalPages) {
        return null;
    }

    return (
        <div className={`pagination ${theme}`}>
            <NavLink to={route.url?.replace(":page", `${prevPage}`) || ""} className={`paginationButton prev ${!hasPrev ? "notActive" : ""}`}><FaArrowLeft /> Prev</NavLink>
            <div className="paginationButton paginationStats">
                page: {page} | total: {totalPages}
                {/* <NavLink to={route.url?.replace(":page", "1") || ""} className={`paginationButton ${page === "1" || page === "undefined" ? "active" : ""}`}>1</NavLink>
                <NavLink to={route.url?.replace(":page", "2") || ""} className={`paginationButton ${page === "2" ? "active" : ""}`}>2</NavLink>
                <NavLink to={route.url?.replace(":page", "3") || ""} className={`paginationButton ${page === "3" ? "active" : ""}`}>3</NavLink>
                <span>...</span>
                <NavLink to={route.url?.replace(":page", `${totalPages}`) || ""} className={`paginationButton ${page === `${totalPages}` ? "active" : ""}`}>{totalPages}</NavLink> */}
            </div>
            <NavLink to={route.url?.replace(":page", `${nextPage}`) || ""} className={`paginationButton next ${!hasNext ? "notActive" : ""}`}>Next <FaArrowRight /></NavLink>
        </div>
    )
}