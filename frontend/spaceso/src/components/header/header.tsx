import Logo from "./logo";
import { SearchBar } from "./searchBar";
import { UserBar } from "./userBar";
import "./header.sass";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { MenuButton } from "./menuButton";

export function Header() {
    const theme = useSelector((state: RootState) => state.ui.theme)
    
    return (
        <header className={`header ${theme}`}>
            <Logo />
            <SearchBar />
            <UserBar />
            <MenuButton />
        </header>
    )
}