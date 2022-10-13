import {Link, Route, Routes} from "react-router-dom";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBars, faPalette, faPlus} from "@fortawesome/free-solid-svg-icons";
import BookAddModal from "./BookAddModal";
import BookDeleteModal from "./BookDeleteModal";
import BookInfoModal from "./BookInfoModal";
import BookInvalidateModal from "./BookInvalidateModal";
import ThemeChangeModal from "./ThemeChangeModal";
import LibraryAll from "./LibraryAll";
import LibraryShelves from "./LibraryShelves";
import LibraryNotInShelf from "./LibraryNotInShelf";
import ErrorPage from "../ErrorPage";
import {logout} from "../Auth";

function Library(props) {
    const [refresh, setRefresh] = useState(0);
    const refreshRef = useRef(0);

    function refreshBooks() {
        refreshRef.current = refreshRef.current + 1;
        setRefresh(refreshRef.current);
    }

    function onLogout(e) {
        logout();
    }

    return (
        <>
            <BookAddModal refresh={refreshBooks}/>
            <BookInfoModal/>
            <BookInvalidateModal/>
            <BookDeleteModal refresh={refreshBooks}/>
            <ThemeChangeModal settings={props.settings} setSetting={props.setSetting} themes={props.themes}/>
            <div className={"d-flex flex-column min-vh-100"}>
                <div className={"p-2 border-bottom sticky-top bg-body"}>
                    <button type={"button"} className={"d-md-none btn-normal btn btn-outline-secondary"}
                            data-bs-toggle={"collapse"} data-bs-target={"#top-nav"} aria-controls={"top-nav"}
                            aria-expanded={false} aria-label={"Toggle navigation"}>
                        <FontAwesomeIcon icon={faBars} width={16} height={16}/>
                    </button>
                    <button type={"button"} className={"btn-normal btn btn-outline-danger float-end"}
                            onClick={onLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} width={16} height={16}/>
                    </button>
                    <button type={"button"} className={"btn-normal btn btn-outline-secondary float-end me-2"}
                            data-bs-toggle={"modal"} data-bs-target={"#theme-modal"}>
                        <FontAwesomeIcon icon={faPalette} width={16} height={16}/>
                    </button>
                    <button type={"button"} className={"btn-normal btn btn-outline-success float-end me-2"}
                            data-bs-toggle={"modal"} data-bs-target={"#add-modal"}>
                        <FontAwesomeIcon icon={faPlus} width={16} height={16}/>
                    </button>
                    <nav className={"nav-pills flex-column d-md-flex flex-md-row collapse navbar-collapse"}
                         id={"top-nav"}>
                        <div className={"d-md-none w-100 border-top my-2"}/>
                        <Link to={"/library/all"} className={"nav-link text-center me-md-2 mb-2 mb-md-0"}>
                            All books
                        </Link>
                        <Link to={"/library/shelves"} className={"nav-link text-center me-md-2 mb-2 mb-md-0"}>
                            Shelves
                        </Link>
                        <Link to={"/library/not-in-shelf"} className={"nav-link text-center"}>
                            Not in shelf
                        </Link>
                    </nav>
                </div>
                <Routes>
                    <Route path="all" element={<LibraryAll refresh={refresh}/>}/>
                    <Route path="shelves" element={<LibraryShelves refresh={refresh}/>}/>
                    <Route path="shelves/:id" element={<LibraryShelves refresh={refresh}/>}/>
                    <Route path="not-in-shelf" element={<LibraryNotInShelf refresh={refresh}/>}/>
                    <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Library;
