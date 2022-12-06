import {useEffect, useRef, useState} from "react";
import {deleteBook} from "../../Api";

function BookDeleteModal(props) {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("...");
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            setId(e.relatedTarget.getAttribute("data-bs-id"));
            setTitle(e.relatedTarget.getAttribute("data-bs-title"));
        });
    }, []);

    function confirm() {
        if (id === null) {
            return;
        }
        deleteBook(id).then(
            res => {
                console.log("Book", id, "Deleted successfully!");
                props.refresh();
            },
            err => console.error(err)
        );
    }

    return (
        <div className={"modal fade"} id={"delete-modal"} tabIndex={-1} aria-labelledby={"delete-modal-label"}
             aria-hidden={true} ref={modal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"delete-modal-label"}>Confirm book deletion</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <h6>{title}</h6>
                        <p className={"mb-0"}>Are you sure you want to delete this book?</p>
                        <p>This process cannot be undone.</p>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal" onClick={confirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookDeleteModal;
