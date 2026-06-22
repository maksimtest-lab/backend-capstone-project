import "./searchBar.sass"
import { FaSearch } from "react-icons/fa"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setSearch } from "../../store/actions/actions"
import { useRef } from "react"
import { useDispatch } from "react-redux"

export function SearchBar() {
    const theme = useSelector((state: RootState) => state.ui.theme)
    const search = useSelector((state: RootState) => state.ui.search)
    const searchRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    
    const handleSearch = () => {
        dispatch(setSearch(searchRef.current?.value || ''))
    }
    
    return (
        <div className={`searchBar ${theme}`}>
            <input type="text" placeholder="Search" defaultValue={search} ref={searchRef} />
            <button onClick={handleSearch}><FaSearch size={20}/></button>
        </div>
    )
}