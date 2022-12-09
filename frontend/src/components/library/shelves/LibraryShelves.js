import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getShelves, getBooksInShelf, invalidateCache} from "../../Api";
import ShelfAddModal from "./modals/ShelfAddModal";
import ShelfEditModal from "./modals/ShelfEditModal";
import ShelfDeleteModal from "./modals/ShelfDeleteModal";
import ShelvesList from "./ShelvesList";
import ShelfContent from "./ShelfContent";

function LibraryShelves(props) {
    const {refresh} = props;
    const {id} = useParams();
    const [shelves, setShelves] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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

    /*
    function invalidateAll() {
        books.forEach(b => {
            const {url, id} = b;
            invalidateCache(url, id).then(
                res => console.log("Book", res, "Cache recreated successfully!"),
                err => console.error(err)
            );
        });
    }
     */

    return (
        <>
            <ShelfAddModal refresh={refreshShelves}/>
            <ShelfEditModal refresh={refreshAll}/>
            <ShelfDeleteModal refresh={refreshShelves}/>
            <div className={"flex-grow-1 d-flex flex-row"}>
                <ShelvesList shelves={shelves} id={id}/>
                <ShelfContent books={books} id={id}/>
            </div>
        </>
    );

}

export default LibraryShelves;
