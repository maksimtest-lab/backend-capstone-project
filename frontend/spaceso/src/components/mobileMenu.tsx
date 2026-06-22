import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { SearchBar } from "./header/searchBar"
import { UserBar } from "./header/userBar"
import { FaWindowClose } from "react-icons/fa"
import Logo from "./header/logo"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../store/actions/actions"
import ThemeSwitcher from "../store/components/themeSwitcher"
import "./mobileMenu.sass"

export default function MobileMenu() {
    const {theme, menuOpen} = useSelector((state: RootState) => state.ui)
    const dispatch = useDispatch()

    const handleToggleMenu = () => {
        dispatch(toggleMenu())
    }

    if (!menuOpen) {
        return null;
    }
    
    return (
        <div className={`mobileMenu ${menuOpen ? "open" : ""} ${theme}`}>
            <div className={`mobileMenuHead ${theme}`}>
                <Logo />
                <FaWindowClose size={28} onClick={handleToggleMenu}/>
            </div>
            <SearchBar />
            <UserBar />
            <ThemeSwitcher />
        </div>
    )
}