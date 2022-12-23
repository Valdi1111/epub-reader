import {useEffect, useState} from "react";
import LibraryItem from "./LibraryItem";
import LibraryItemAdder from "./LibraryItemAdder";

function LibraryBase(props) {
    const {refresh, provider} = props;
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const amount = 20;

    // Reload all books from 0 to page on refresh
    useEffect(() => {
        request(false, (page + 1) * amount, 0);
    }, [refresh]);

    // Show the first books on page change
    useEffect(() => {
        setPage(0);
        request(false, amount, 0);
    }, [provider]);

    // Add more books to the screen
    useEffect(() => {
        if (page === 0) {
            return;
        }
        request(true, amount, page * amount);
    }, [page]);

    function request(add, limit, offset) {
        provider(limit + 1, offset).then(
            res => {
                if (add) {
                    setBooks([...books, ...res.data.slice(0, limit)])
                } else {
                    setBooks(res.data.slice(0, limit))
                }
                setHasMore(res.data.length > limit);
            },
            err => console.error(err)
        );
    }

    function loadMore() {
        setPage(page + 1);
    }

    return (
        <div className={"scroll-pane flex-grow-1"}>
            <div className={"scroll-pane-inner row mx-0"}>
                {books.map(b =>
                    <div className={"col-auto p-2"} key={b.id}>
                        <LibraryItem book={b}/>
                    </div>
                )}
                <LibraryItemAdder hasMore={hasMore} loadMore={loadMore}/>
            </div>
        </div>
    );

}

export default LibraryBase;
