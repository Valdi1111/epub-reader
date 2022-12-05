import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {getShelves, getBooksInShelf} from "../Api";
import ShelfAddModal from "./ShelfAddModal";
import ShelfEditModal from "./ShelfEditModal";
import ShelfDeleteModal from "./ShelfDeleteModal";
import LibraryItem from "./LibraryItem";

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

    function ShelfButtons() {
        if (id === undefined || !shelves.length) {
            return <></>;
        }
        return (
            <>
                <button className={"btn btn-primary btn-icon ms-auto"}
                        type={"button"} data-bs-toggle={"modal"} data-bs-target={"#edit-shelf-modal"}
                        data-bs-path={shelves.filter(s => `${s.id}` === id).map(s => s.path)[0]}
                        data-bs-name={shelves.filter(s => `${s.id}` === id).map(s => s.name)[0]}
                        data-bs-id={id}>
                    <FontAwesomeIcon icon={faPencil} width={16} height={16}/>
                </button>
                <button className={"btn btn-danger btn-icon ms-2"}
                        type={"button"} data-bs-toggle={"modal"} data-bs-target={"#delete-shelf-modal"}
                        data-bs-name={shelves.filter(s => `${s.id}` === id).map(s => s.name)[0]}
                        data-bs-id={id}>
                    <FontAwesomeIcon icon={faTrash} width={16} height={16}/>
                </button>
            </>
        );
    }

    function dMode(shelf) {
        if ((shelf && id !== undefined) || (!shelf && id === undefined)) {
            return "d-none";
        }
        return "";
    }

    function shelfActive(shelf) {
        if (`${shelf.id}` === id) {
            return "active";
        }
        return "";
    }

    function ShelfItem(props) {
        const {s} = props
        return (
            <li key={s.id} data-id={s.id} title={s.name} className={`list-group-item p-0 ${shelfActive(s)}`}>
                <Link className={"d-flex flex-row justify-content-between align-items-start py-2 px-3"}
                      to={`/library/shelves/${s.id}`}>
                    <div className={"min-width-0"}>
                        <p className={"fw-bold mb-0"}>{s.name}</p>
                        <p className={"small mb-0 text-truncate"}>Folder: {s.path}/</p>
                    </div>
                    <span className={"badge bg-primary rounded-pill"}>{s.books}</span>
                </Link>
            </li>
        );
    }

    return (
        <>
            <ShelfAddModal refresh={refreshShelves}/>
            <ShelfEditModal refresh={refreshAll}/>
            <ShelfDeleteModal refresh={refreshShelves}/>
            <div className={"flex-grow-1 row mx-0"}>
                <div className={`d-md-block col-12 col-md-4 col-lg-3 px-0 ${dMode(true)}`}>
                    <div className={"d-flex flex-column h-100"}>
                        <div className={"flex-grow-1 scroll-pane"}>
                            <ul className={"scroll-pane-inner list-group list-group-flush"}>
                                {shelves.map(s => <ShelfItem key={s.id} s={s}/>)}
                            </ul>
                        </div>
                        <div className={"d-flex flex-row w-100 p-2"}>
                            <button className={"btn btn-success btn-icon"}
                                    type={"button"} data-bs-toggle={"modal"} data-bs-target={"#add-shelf-modal"}>
                                <FontAwesomeIcon icon={faPlus} width={16} height={16}/>
                            </button>
                            <ShelfButtons/>
                        </div>
                    </div>
                </div>
                <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 px-0 ${dMode(false)}`}>
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
