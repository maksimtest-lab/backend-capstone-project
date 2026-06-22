import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/actions/actions.ts';
import { ArticlesPage } from './ArticlesPage';

export function MainPage() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPageTitle(''));
    }, [dispatch]);

    return (
        <ArticlesPage />
    )
}