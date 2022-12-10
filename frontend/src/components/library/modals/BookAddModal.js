import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {createBook, findNew} from "../../Api";

function BookAddModal(props) {
    const [content, setContent] = useState({});
    const modal = useRef();
    const checkboxName = "book-add-modal-select-book";

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            findNew().then(
                res => setContent(res.data),
                err => console.error(err)
            );
        });
        modal.current.addEventListener("hidden.bs.modal", (e) => {
            setContent({});
        });
    }, []);

    function confirm() {
        const elems = $(`div.modal-body input[name='${checkboxName}']:checked`);
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

    function getSections() {
        let e = [];
        let num = 0;
        for (let key in content) {
            let val = content[key];
            e = [...e, <SectionItem key={key} uid={num} shelf={key} books={val}/>];
            num++;
        }
        return e;
    }

    function SectionItem(props) {
        const {uid, shelf, books} = props;
        const headerId = `book-add-modal-section-${uid}-header`;
        const bodyId = `book-add-modal-section-${uid}-body`;

        return (
            <div className={"accordion-item"}>
                <h2 id={headerId} className={"accordion-header"}>
                    <button className={"accordion-button collapsed"} type={"button"} data-bs-toggle={"collapse"}
                            data-bs-target={`#${bodyId}`} aria-expanded={false} aria-controls={bodyId}>
                        {shelf}
                    </button>
                </h2>
                <div id={bodyId} className={"accordion-collapse collapse"} aria-labelledby={headerId}
                     data-bs-parent={"#book-add-modal-accordion"}>
                    <div className={"accordion-body"}>
                        {books.map((book, id) => <BookItem key={id} id={id} uid={uid} book={book}/>)}
                    </div>
                </div>
            </div>
        );
    }

    function BookItem(props) {
        const {id, uid, book} = props;
        const itemId = `book-add-modal-section-${uid}-book-${id}`;
        return (
            <div className={"form-check"}>
                <input className={"form-check-input"} type={"checkbox"} id={itemId} name={checkboxName}
                       value={book.path}/>
                <label className={"form-check-label"} htmlFor={itemId}>{book.file}</label>
            </div>
        );
    }

    return (
        <div className={"modal fade"} id={"book-add-modal"} tabIndex={-1} aria-hidden={true}
             aria-labelledby={"book-add-modal-label"} ref={modal}>
            <div className={"modal-dialog modal-dialog-centered modal-dialog-scrollable"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"book-add-modal-label"}>Add books to Library</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div id={"book-add-modal-accordion"} className={"modal-body p-0 accordion accordion-flush"}>
                        {getSections()}
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss={"modal"}>
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss={"modal"}
                                onClick={confirm}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookAddModal;
