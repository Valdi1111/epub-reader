import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {deleteShelf} from "../../../Api";

function ShelfDeleteModal(props) {
    const deleteShelfModal = useRef();
    const deleteShelfName = useRef();
    const deleteShelfConfirm = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        deleteShelfModal.current.addEventListener("show.bs.modal", (e) => {
            const id = e.relatedTarget.getAttribute("data-bs-id");
            deleteShelfName.current.textContent = e.relatedTarget.getAttribute("data-bs-name");
            deleteShelfConfirm.current.onclick = () => {
                deleteShelf(id).then(
                    res => {
                        props.refresh();
                        navigate(`/library/shelves`);
                    },
                    err => console.error(err)
                );
            };
        });
    }, []);

    return (
        <div className={"modal fade"} id={"delete-shelf-modal"} tabIndex={-1}
             aria-labelledby={"delete-shelf-modal-label"} aria-hidden={true} ref={deleteShelfModal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"delete-shelf-modal-label"}>Confirm shelf deletion</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <h6 ref={deleteShelfName}>...</h6>
                        <p className={"mb-0"}>Are you sure you want to delete this shelf?</p>
                        <p>This process cannot be undone.</p>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal"
                                ref={deleteShelfConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShelfDeleteModal;
