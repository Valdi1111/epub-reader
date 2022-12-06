import {useEffect, useRef, useState} from "react";
import {editShelf} from "../../../Api";

function ShelfEditModal(props) {
    const [id, setId] = useState(null);
    const path = useRef();
    const name = useRef();
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            setId(e.relatedTarget.getAttribute("data-bs-id"));
            path.current.value = e.relatedTarget.getAttribute("data-bs-path");
            name.current.value = e.relatedTarget.getAttribute("data-bs-name");
        });
    }, []);

    function confirm() {
        if (id === null) {
            return;
        }
        editShelf(id, path.current.value, name.current.value).then(
            res => props.refresh(),
            err => console.error(err)
        );
    }

    return (
        <div className={"modal fade"} id={"edit-shelf-modal"} tabIndex={-1} aria-labelledby={"edit-shelf-modal-label"}
             aria-hidden={true} ref={modal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"edit-shelf-modal-label"}>Edit shelf</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <div className="mb-2">
                            <label htmlFor="edit-path" className="form-label">Path</label>
                            <input ref={path} type="text" className="form-control" id="edit-path"
                                   aria-describedby="edit-path-help"/>
                            <div id="edit-path-help" className="form-text">Insert a folder without the / at the
                                end.
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="edit-name" className="form-label">Name</label>
                            <input ref={name} type="text" className="form-control" id="edit-name"/>
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal" onClick={confirm}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShelfEditModal;
