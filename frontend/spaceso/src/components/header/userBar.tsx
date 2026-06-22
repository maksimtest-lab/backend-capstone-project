import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts/routes";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import "./userBar.sass"
import { FaUser } from "react-icons/fa";

export function UserBar() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    
    // Display user's display name if available, otherwise fall back to email
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
    
    return (
        <div className={`userBar ${theme}`}>
            {isAuthenticated ? (
                <div className="user-info">
                    <NavLink to={ROUTES.PROFILE.url} className="user-avatar">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt={displayName} className="avatar" />
                        ) : (
                            <div className="avatar-placeholder">
                                <FaUser />
                            </div>
                        )}
                    </NavLink>
                    <span className="user-name">{displayName}</span>
                </div>
            ) : (
                <div className="auth-links">
                    <NavLink to={ROUTES.LOGIN.url} className="auth-link">Sign In</NavLink>
                    <NavLink to={ROUTES.REGISTRATION.url} className="auth-link sign-up">Sign Up</NavLink>
                </div>
            )}
        </div>
    );
}