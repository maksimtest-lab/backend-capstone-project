import "./socials.sass"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Socials() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    
    return (
        <div className={`socials ${theme}`}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="socialsLink">
                <FaFacebook size={24}/>
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="socialsLink">
                <FaTwitter size={24}/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="socialsLink">
                <FaInstagram size={24}/>
            </a>
        </div>
    );
}