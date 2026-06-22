import { useSelector } from "react-redux";
import type { RootState } from "../index";
import { useDispatch } from "react-redux";
import { setTheme } from "../actions/actions";
import "./themeSwitcher.sass"

export default function ThemeSwitcher() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`themeSwitcher ${theme}`}>
            {theme === 'light' ? 'Light' : 'Dark'} theme <button className={`themeSwitcherButton ${theme === 'light' ? '' : 'active'}`} onClick={toggleTheme}></button>
        </div>
    );
}
