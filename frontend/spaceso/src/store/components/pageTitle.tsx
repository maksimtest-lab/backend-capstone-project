import { useSelector } from "react-redux";
import type { RootState } from "../index";
import "./pageTitle.sass"

export default function PageTitle() {
    const title = useSelector((state: RootState) => state.ui?.title || 'Spaceso');
    const theme = useSelector((state: RootState) => state.ui.theme)

    return (
        <h1 className={`pageTitle ${theme}`}>{title}</h1>
    );
}
