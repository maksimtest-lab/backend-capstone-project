import { AnyAction } from 'redux';
import { SET_THEME, SET_PAGE_TITLE, SET_BREADCRUMBS, SET_USERNAME, SET_SEARCH, TOGGLE_MENU } from "../actions/actionTypes.ts";

const initialState = {
    theme: 'light',
    username: '',
    search: '',
    title: 'Spaceso',
    menuOpen: false,
    breadcrumbs: [
        {url: '/', name: 'Home'}
    ]
};

export default function uiReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case SET_THEME:
            return { ...state, theme: action.payload };
        case SET_USERNAME:
            return { ...state, username: action.payload };
        case SET_SEARCH:
            return { ...state, search: action.payload };
        case SET_PAGE_TITLE:
            return { ...state, title: action.payload };
        case SET_BREADCRUMBS:
            return { ...state, breadcrumbs: action.payload };
        case TOGGLE_MENU:
            return { ...state, menuOpen: !state.menuOpen };
        default:
            return state;
    }
}