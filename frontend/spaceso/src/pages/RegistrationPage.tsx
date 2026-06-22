
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { ROUTES } from "../consts/routes";
import { registration, setPageTitle, setBreadcrumbs } from "../store/actions/actions";
import "./registrationPage.sass";

export function RegistrationPage() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);
    const { theme } = useSelector((state: RootState) => state.ui);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {url: '/', name: 'Home'},
            {url: '/registration', name: 'Registration'}
        ]));
        dispatch(setPageTitle('Sign Up'));
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        if (email && password) {
            dispatch(registration(email, password));
        }
    }

    if (isAuthenticated) {
        return <Navigate to={ROUTES.ARTICLES.url} />;
    }

    return (
        <div className="registrationPage">
            <div className={`registrationPageForm ${theme}`}>
                <form onSubmit={(handleSubmit)}>
                    <div className="registrationPageFormGroup">
                        <label htmlFor="email">
                            <span>Email</span>
                        </label>
                            <input type="text" placeholder="Your email" id="email" required ref={emailRef}/>
                    </div>
                    <div className="registrationPageFormGroup">
                        <label htmlFor="password">
                            <span>Password</span>
                        </label>
                        <input type="password" placeholder="Password" id="password" required ref={passwordRef}  />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <NavLink to={ROUTES.LOGIN.url}>Sign In</NavLink></p>
            </div>
        </div>
    )
}