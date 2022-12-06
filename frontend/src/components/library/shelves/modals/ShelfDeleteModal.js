import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteShelf} from "../../../Api";

function ShelfDeleteModal(props) {
    const [id, setId] = useState(null);
    const [name, setName] = useState("...");
    const modal = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            setId(e.relatedTarget.getAttribute("data-bs-id"));
            setName(e.relatedTarget.getAttribute("data-bs-name"));
        });
    }, []);

    function confirm() {
        if (id === null) {
            return;
        }
        deleteShelf(id).then(
            res => {
                props.refresh();
                navigate(`/library/shelves`);
            },
            err => console.error(err)
        );
    }

    return (
        <div className={"modal fade"} id={"delete-shelf-modal"} tabIndex={-1}
             aria-labelledby={"delete-shelf-modal-label"} aria-hidden={true} ref={modal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"delete-shelf-modal-label"}>Confirm shelf deletion</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <h6>{name}</h6>
                        <p className={"mb-0"}>Are you sure you want to delete this shelf?</p>
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

export default ShelfDeleteModal;
