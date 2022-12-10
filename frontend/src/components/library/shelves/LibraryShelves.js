import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getShelves, getBooksInShelf, invalidateCache} from "../../Api";
import ShelfAddModal from "./modals/ShelfAddModal";
import ShelfEditModal from "./modals/ShelfEditModal";
import ShelfDeleteModal from "./modals/ShelfDeleteModal";
import ShelvesList from "./ShelvesList";
import ShelvesContent from "./ShelvesContent";

function LibraryShelves(props) {
    const {refresh} = props;
    const {id} = useParams();
    const [shelves, setShelves] = useState([]);
    const [elements, setElements] = useState([]);
    const navigate = useNavigate();

    // refresh shelves on parent delete (for badge number)
    useEffect(() => {
        refreshShelves();
    }, [refresh]);

    // refresh books on parent delete and on shelf id change
    useEffect(() => {
        if (id === undefined) {
            setElements([]);
            return;
        }
        refreshElements();
    }, [id, refresh]);

    function refreshShelves() {
        getShelves().then(
            res => setShelves(res.data),
            err => console.error(err)
        );
    }

    function refreshElements() {
        getBooksInShelf(id).then(
            res => setElements(res.data),
            err => {
                navigate(`/library/shelves`);
                console.error(err);
            }
        );
    }

    function refreshAll() {
        refreshShelves();
        refreshElements();
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
                <ShelvesContent id={id} elements={elements}/>
            </div>
        </>
    );

}

export default LibraryShelves;
