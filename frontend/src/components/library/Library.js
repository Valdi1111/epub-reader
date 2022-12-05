import {Link, Route, Routes} from "react-router-dom";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import BookAddModal from "./BookAddModal";
import BookDeleteModal from "./BookDeleteModal";
import BookInfoModal from "./BookInfoModal";
import BookInvalidateModal from "./BookInvalidateModal";
import ThemeChangeModal from "./ThemeChangeModal";
import LibraryAll from "./LibraryAll";
import LibraryShelves from "./LibraryShelves";
import LibraryNotInShelf from "./LibraryNotInShelf";
import ErrorPage from "../ErrorPage";
import avatar from "../../images/avatar.png";

function Library(props) {
    const [refresh, setRefresh] = useState(0);
    const refreshRef = useRef(0);

    function refreshBooks() {
        refreshRef.current = refreshRef.current + 1;
        setRefresh(refreshRef.current);
    }

    function logout(e) {
        window.localStorage.removeItem("token");
        props.logout();
    }

    return (
        <>
            <BookAddModal refresh={refreshBooks}/>
            <BookInfoModal/>
            <BookInvalidateModal/>
            <BookDeleteModal refresh={refreshBooks}/>
            <ThemeChangeModal settings={props.settings} setSetting={props.setSetting} themes={props.themes}/>
            <div className={"d-flex flex-column min-vh-100"}>
                <div className={"sticky-top border-bottom bg-body"}>
                    <div className={"d-flex align-items-center justify-content-between p-2"} style={{height: "60px"}}>
                        <button type={"button"} className={"btn-icon d-md-none btn btn-outline-secondary"}
                                data-bs-toggle={"collapse"} data-bs-target={"#top-nav"} aria-controls={"top-nav"}
                                aria-expanded={false} aria-label={"Toggle navigation"}>
                            <FontAwesomeIcon icon={faBars} width={16} height={16}/>
                        </button>
                        <nav className={"d-none d-md-flex flex-row nav-pills"}>
                            <div/>
                            <Link to={"/library/all"} className={"nav-link text-center me-2"}>All books</Link>
                            <Link to={"/library/shelves"} className={"nav-link text-center me-2"}>Shelves</Link>
                            <Link to={"/library/not-in-shelf"} className={"nav-link text-center"}>Not in shelf</Link>
                        </nav>
                        <div className="dropdown">
                            <div className={"link-secondary dropdown-toggle cursor-pointer"} id={"dropdown-user"}
                                 data-bs-toggle={"dropdown"} aria-expanded={false}>
                                <img src={avatar} alt={"avatar"} width={40} height={40} className={"rounded-circle"}/>
                            </div>
                            <ul className={"dropdown-menu text-small"} aria-labelledby={"dropdown-user"}>
                                <li>
                                    <span className={"dropdown-item cursor-pointer"} data-bs-toggle={"modal"}
                                          data-bs-target={"#add-modal"}>Add</span>
                                </li>
                                <li>
                                    <span className={"dropdown-item cursor-pointer"} data-bs-toggle={"modal"}
                                          data-bs-target={"#theme-modal"}>Theme</span>
                                </li>
                                <li><hr className={"dropdown-divider"}/></li>
                                <li>
                                    <span className={"dropdown-item cursor-pointer"} onClick={logout}>Sign out</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <nav className={"flex-column d-md-none nav-pills collapse navbar-collapse"} id={"top-nav"}>
                        <div className={"w-100 border-top"}/>
                        <Link to={"/library/all"} className={"nav-link text-center m-2"}>All books</Link>
                        <Link to={"/library/shelves"} className={"nav-link text-center m-2"}>Shelves</Link>
                        <Link to={"/library/not-in-shelf"} className={"nav-link text-center m-2"}>Not in shelf</Link>
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
