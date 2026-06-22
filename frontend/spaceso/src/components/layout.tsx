import "./layout.sass"
import { Header } from "./header/header"
import PageTitle from "../store/components/pageTitle"
import ThemeSwitcher from "../store/components/themeSwitcher"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Breadcrumbs } from "./breadcrumbs"
import { useEffect } from "react"
import { setBreadcrumbs } from "../store/actions/actions"
import { useDispatch } from "react-redux"
import MobileMenu from "./mobileMenu"

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    const {theme, menuOpen} = useSelector((state: RootState) => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setBreadcrumbs([
        ]));
    }, [dispatch]);

    return (
        <div className={`layout ${theme}`}>
            <MobileMenu />
            {!menuOpen && <><Header />
            <main>
                <Breadcrumbs />
                <PageTitle></PageTitle>
                {children}
            </main>
            <footer>
                <p>© {new Date().getFullYear()} Spaceso. All rights reserved.</p>
                <ThemeSwitcher />
            </footer>
            </>}
        </div>
    )
}

export { Layout }
