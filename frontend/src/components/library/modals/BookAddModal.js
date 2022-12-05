import {useEffect, useRef} from "react";
import $ from "jquery";
import {createBook, findNew} from "../../Api";

function BookAddModal(props) {
    const addModal = useRef();
    const addBody = useRef();
    const addConfirm = useRef();

    useEffect(() => {
        addModal.current.addEventListener("show.bs.modal", (e) => {
            $(addBody.current).empty();
            findNew().then(
                res => {
                    let id = 0;
                    res.data.map(item => {
                        const elem = $(`
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${item}" id="select-book-${id}"/>
                                <label class="form-check-label" for="select-book-${id}">${item}</label>
                            </div>
                        `);
                        $(addBody.current).append(elem);
                        id++;
                    })
                },
                err => console.error(err)
            );
        });
        addConfirm.current.onclick = () => {
            const elems = $(addBody.current).find(".form-check > input[type=checkbox]:checked");
            elems.each((index, elem) => {
                createBook(elem.value).then(
                    res => {
                        console.log("Book", res, "Created successfully!");
                        props.refresh();
                    },
                    err => console.error(err)
                );
            });
        };
    }, []);

    return (
        <div className={"modal fade"} id={"add-modal"} tabIndex={-1} aria-labelledby={"add-modal-label"}
             aria-hidden={true} ref={addModal}>
            <div className={"modal-dialog modal-dialog-centered modal-dialog-scrollable"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"add-modal-label"}>Add books to Library</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div ref={addBody} className={"modal-body"}>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal"
                                ref={addConfirm}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookAddModal;
