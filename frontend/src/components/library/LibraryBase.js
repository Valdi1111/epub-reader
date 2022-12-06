import {useEffect, useState} from "react";
import LibraryItem from "./LibraryItem";
import LibraryItemAdder from "./LibraryItemAdder";

function LibraryBase(props) {
    const {refresh, provider} = props;
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        provider().then(
            res => {
                setAllBooks(res.data);
                setBooks(res.data.slice(0, 20));
                setPage(1);
            },
            err => console.error(err)
        );
    }, [refresh, provider]);

    useEffect(() => {
        if (page === 1) {
            return;
        }
        setBooks(allBooks.slice(0, 20 * page));
    }, [page]);

    return (
        <div className={"scroll-pane flex-grow-1"}>
            <div className={"scroll-pane-inner row mx-0"}>
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

export default LibraryBase;
