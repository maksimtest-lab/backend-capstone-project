import { useDispatch } from 'react-redux';
import { setPageTitle, setBreadcrumbs } from '../store/actions/actions';
import { useEffect } from 'react';
// import { auth } from '../firebase_';
// import { signOut } from 'firebase/auth';
import './userProfilePage.sass';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useRef } from 'react'; 
// import { updateUsername } from '../store/actions/actions';

export function UserProfile() {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setBreadcrumbs([
            // {url: '/', name: 'Home'},
            // {url: '/settings', name: 'Settings'}
        ]));
        dispatch(setPageTitle('Profile'));
    }, [dispatch]);

    const { theme } = useSelector((state: RootState) => state.ui);
    const usernameRef = useRef<HTMLInputElement>(null);
    const { error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameRef.current?.value || '';
        if (username) {
            // dispatch(updateUsername(username));
        }
    }

    return (
        <div className="profile">
            <div className={`registrationPageForm ${theme}`}>
                <form onSubmit={(handleSubmit)}>
                    <div className="registrationPageFormGroup">
                        <label htmlFor="User Name">
                            <span>User Name</span>
                        </label>
                            <input type="text" placeholder="Username" id="Username" required ref={usernameRef} defaultValue={user?.displayName || ''}/>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Save</button>
                </form>
            </div>
            <br></br>
            <button onClick={() => null}>Logout</button>
        </div>
    )
}