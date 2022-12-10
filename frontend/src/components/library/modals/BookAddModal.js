import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {createBook, findNew} from "../../Api";

function BookAddModal(props) {
    const [books, setBooks] = useState([]);
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            findNew().then(
                res => setBooks(res.data),
                err => console.error(err)
            );
        });
        modal.current.addEventListener("hidden.bs.modal", (e) => {
            setBooks([]);
        });
    }, []);

    function confirm() {
        const elems = $("div.modal-body input[name='select-book']:checked");
        elems.each((index, elem) => {
            createBook(elem.value).then(
                res => {
                    console.log("Book", res, "Created successfully!");
                    props.refresh();
                },
                err => console.error(err)
            );
        });
    }

    function BookItem(props) {
        const {id, book} = props;
        return (
            <div className={"form-check"}>
                <input className={"form-check-input"} type={"checkbox"} id={"book-" + id} name={"select-book"}
                       value={book}/>
                <label className={"form-check-label"} htmlFor={"book-" + id}>{book}</label>
            </div>
        );
    }

    return (
        <div className={"modal fade"} id={"add-modal"} tabIndex={-1} aria-labelledby={"add-modal-label"}
             aria-hidden={true} ref={modal}>
            <div className={"modal-dialog modal-dialog-centered modal-dialog-scrollable"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"add-modal-label"}>Add books to Library</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        {books.map((book, i) => <BookItem key={i} id={i} book={book}/>)}
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal" onClick={confirm}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookAddModal;
