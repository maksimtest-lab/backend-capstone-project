import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/actions/actions.ts';

export function PageNotFound() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPageTitle('Page Not Found'));
    }, [dispatch]);

    return (
        <p className="pageNotFound">Page not found!</p>
    )
}