import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import $ from "jquery";
import {getShelves, getBooksInShelf} from "../../Api";
import ShelfAddModal from "./modals/ShelfAddModal";
import ShelfEditModal from "./modals/ShelfEditModal";
import ShelfDeleteModal from "./modals/ShelfDeleteModal";
import LibraryItem from "../LibraryItem";
import ShelfItem from "./ShelfItem";
import ShelfButtons from "./ShelfButtons";

function LibraryShelves(props) {
    const {refresh} = props;
    const {id} = useParams();
    const [shelves, setShelves] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        $("nav.nav-pills > .nav-link").removeClass("active");
        $("nav.nav-pills > .nav-link:nth-child(3)").addClass("active");
    }, []);

    // refresh shelves on parent delete (for badge number)
    useEffect(() => {
        refreshShelves();
    }, [refresh]);

    // refresh books on parent delete and on shelf id change
    useEffect(() => {
        if (id === undefined) {
            setBooks([]);
            return;
        }
        refreshBooks();
    }, [id, refresh]);

    function refreshShelves() {
        getShelves().then(
            res => setShelves(res.data),
            err => console.error(err)
        );
    }

    function refreshBooks() {
        getBooksInShelf(id).then(
            res => setBooks(res.data),
            err => {
                navigate(`/library/shelves`);
                console.error(err);
            }
        );
    }

    function refreshAll() {
        refreshShelves();
        refreshBooks();
    }

    function dMode(shelf) {
        if ((shelf && id !== undefined) || (!shelf && id === undefined)) {
            return "d-none";
        }
        return "";
    }

    return (
        <>
            <ShelfAddModal refresh={refreshShelves}/>
            <ShelfEditModal refresh={refreshAll}/>
            <ShelfDeleteModal refresh={refreshShelves}/>
            <div className={"flex-grow-1 d-flex flex-row"}>
                <div className={`d-md-flex flex-column col-12 col-md-4 col-lg-3 ${dMode(true)}`}>
                    <div className={"flex-grow-1 scroll-pane"}>
                        <ul className={"scroll-pane-inner list-group list-group-flush"}>
                            {shelves.map(s => <ShelfItem key={s.id} shelf={s} active={s.id == id}/>)}
                        </ul>
                    </div>
                    <div className={"d-flex flex-row p-2"}>
                        <ShelfButtons shelf={shelves.filter(s => s.id == id)[0]} active={id !== undefined}/>
                    </div>
                </div>
                <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 ${dMode(false)}`}>
                    <div className={"scroll-pane-inner row mx-0"}>
                        {books.map(b =>
                            <div className={"col-auto p-2"} key={b.id}>
                                <LibraryItem book={b}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

}

export default LibraryShelves;
