import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { ROUTES } from "../consts/routes";
import { login, setPageTitle, setBreadcrumbs } from "../store/actions/actions";
import "./registrationPage.sass";

export function LoginPage() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);
    const { theme } = useSelector((state: RootState) => state.ui);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {url: '/', name: 'Home'},
            {url: '/login', name: 'Login'}
        ]));
        dispatch(setPageTitle('Sign In'));
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        if (username && password) {
            dispatch(login(username, password));
        }
    }

    if (isAuthenticated) {
        return <Navigate to={ROUTES.ARTICLES.url} />;
    }

    return (
        <div className="loginPage">
            <div className={`loginPageForm ${theme}`}>
                <form onSubmit={(handleSubmit)}>
                    <div className="loginPageFormGroup">
                        <label htmlFor="email">
                            <span>Username</span>
                        </label>
                            <input type="text" placeholder="Your username" id="username" required ref={usernameRef}/>
                    </div>
                    {/* <div className="loginPageFormGroup">
                        <label htmlFor="email">
                            <span>Email</span>
                        </label>
                            <input type="text" placeholder="Your email" id="email" required ref={emailRef}/>
                    </div> */}
                    <div className="loginPageFormGroup">
                        <label htmlFor="password">
                            <span>Password</span>
                        </label>
                        <input type="password" placeholder="Password" id="password" required ref={passwordRef}  />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Sign In</button>
                </form>
                <p>Don't have an account? <NavLink to={ROUTES.REGISTRATION.url}>Sign In</NavLink></p>
            </div>
        </div>
    )
}