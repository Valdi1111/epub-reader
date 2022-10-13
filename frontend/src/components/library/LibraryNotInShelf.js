import {useEffect, useState} from "react";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {getNotInShelf} from "../Api";
import LibraryItem from "./LibraryItem";
import LibraryItemAdder from "./LibraryItemAdder";

function LibraryNotInShelf(props) {
    const {refresh} = props;
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        $("nav.nav-pills > .nav-link").removeClass("active");
        $("nav.nav-pills > .nav-link:nth-child(4)").addClass("active");
    }, []);

    useEffect(() => {
        getNotInShelf().then(
            res => {
                setAllBooks(res.data);
                setBooks(res.data.slice(0, 20));
                setPage(1);
            },
            err => console.error(err)
        );
    }, [refresh]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        setBooks(allBooks.slice(0, 20 * page));
    }, [page]);

    return (
        <div className={"flex-grow-1"}>
            <div className={"row mx-0"}>
                {books.map(b =>
                    <div className={"col-auto p-2"} key={b.id}>
                        <LibraryItem book={b}/>
                    </div>
                )}
                <LibraryItemAdder allBooks={allBooks} books={books} page={page} setPage={setPage}/>
            </div>
        </div>
    );

}

export default LibraryNotInShelf;
