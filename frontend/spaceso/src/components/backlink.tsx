import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import "./backlink.sass"

export default function Backlink() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const navigation = useNavigate();

    const backLinkHandle = (event: React.MouseEvent) => {
        event.preventDefault(); 
        navigation(-1);
    }
    
    return (
        <div className={`backlink ${theme}`}>
            <NavLink to="" onClick={backLinkHandle}>
                <FaArrowLeft /> Back to previous page
            </NavLink>
        </div>
    )
}