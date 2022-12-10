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
    const [content, setContent] = useState({});
    const navigate = useNavigate();

    // refresh shelves and content on book add/delete (for badge number)
    useEffect(() => {
        refreshShelves();
        refreshElements();
    }, [refresh]);

    // refresh content on shelf id change
    useEffect(() => {
        setContent({});
        refreshElements();
    }, [id]);

    function refreshShelves() {
        getShelves().then(
            res => setShelves(res.data),
            err => console.error(err)
        );
    }

    function refreshElements() {
        if (id === undefined) {
            return;
        }
        getBooksInShelf(id).then(
            res => setContent(res.data),
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
                <ShelvesContent id={id} content={content}/>
            </div>
        </>
    );

}

export default LibraryShelves;
