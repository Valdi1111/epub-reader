import {Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import BookAddModal from "./modals/BookAddModal";
import BookDeleteModal from "./modals/BookDeleteModal";
import BookInfoModal from "./modals/BookInfoModal";
import BookInvalidateModal from "./modals/BookInvalidateModal";
import ThemeChangeModal from "./modals/ThemeChangeModal";
import LibraryHeader from "./LibraryHeader";
import LibraryBase from "./LibraryBase";
import LibraryShelves from "./shelves/LibraryShelves";
import ErrorPage from "../ErrorPage";
import {getBooks, getNotInShelf} from "../Api";
import $ from "jquery";

function Library(props) {
    const [refresh, setRefresh] = useState(0);
    const refreshRef = useRef(0);
    const location = useLocation();

    useEffect(() => {
        $("nav.nav-pills > .nav-link").removeClass("active");
        if (location.pathname.startsWith("/library/all")) {
            $("#pc-nav > .nav-link:nth-child(1)").addClass("active");
            $("#mobile-nav > .nav-link:nth-child(2)").addClass("active");
        }
        if (location.pathname.startsWith("/library/shelves")) {
            $("#pc-nav > .nav-link:nth-child(2)").addClass("active");
            $("#mobile-nav > .nav-link:nth-child(3)").addClass("active");
        }
        if (location.pathname.startsWith("/library/not-in-shelf")) {
            $("#pc-nav > .nav-link:nth-child(3)").addClass("active");
            $("#mobile-nav > .nav-link:nth-child(4)").addClass("active");
        }
    }, [location]);

    function refreshBooks() {
        refreshRef.current = refreshRef.current + 1;
        setRefresh(refreshRef.current);
    }

    return (
        <>
            <BookAddModal refresh={refreshBooks}/>
            <BookInfoModal/>
            <BookInvalidateModal/>
            <BookDeleteModal refresh={refreshBooks}/>
            <ThemeChangeModal settings={props.settings} setSetting={props.setSetting} themes={props.themes}/>
            <div className={"d-flex flex-column min-vh-100"}>
                <LibraryHeader logout={props.logout}/>
                <Routes>
                    <Route path={"all"} element={<LibraryBase refresh={refresh} provider={getBooks}/>}/>
                    <Route path={"shelves"} element={<LibraryShelves refresh={refresh}/>}/>
                    <Route path={"shelves/:id"} element={<LibraryShelves refresh={refresh}/>}/>
                    <Route path={"not-in-shelf"} element={<LibraryBase refresh={refresh} provider={getNotInShelf}/>}/>
                    <Route path={"*"} element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Library;
