import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ROUTES } from "../consts/routes";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return (<div>
                Please <NavLink to={ROUTES.LOGIN.url}>login</NavLink> or <NavLink to={ROUTES.REGISTRATION.url}>register</NavLink> to  view this page.
            </div>)
    }

    return children;
}
