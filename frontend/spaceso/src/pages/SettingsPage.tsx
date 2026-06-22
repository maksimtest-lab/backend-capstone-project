import { useDispatch } from 'react-redux';
import { setPageTitle, setBreadcrumbs } from '../store/actions/actions';
import { useEffect } from 'react';

export function Settings() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setBreadcrumbs([
            // {url: '/', name: 'Home'},
            // {url: '/settings', name: 'Settings'}
        ]));
        dispatch(setPageTitle('Settings'));
    }, [dispatch]);

    return (
        <>
            settings
        </>
    )
}