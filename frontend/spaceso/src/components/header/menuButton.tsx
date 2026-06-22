import { FaBars } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../../store/actions/actions"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import "./menuButton.sass"

export function MenuButton() {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.ui.theme)

    const handleToggleMenu = () => {
        dispatch(toggleMenu())
    }
    
    return (
        <div className={`menuButton ${theme}`}>
            <button onClick={handleToggleMenu}><FaBars /></button>
        </div>
    )
}