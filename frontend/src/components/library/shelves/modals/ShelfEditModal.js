import {useEffect, useRef} from "react";
import {editShelf} from "../../../Api";

function ShelfEditModal(props) {
    const editShelfModal = useRef();
    const editShelfPath = useRef();
    const editShelfName = useRef();
    const editShelfConfirm = useRef();

    useEffect(() => {
        editShelfModal.current.addEventListener("show.bs.modal", (e) => {
            const id = e.relatedTarget.getAttribute("data-bs-id");
            editShelfPath.current.value = e.relatedTarget.getAttribute("data-bs-path");
            editShelfName.current.value = e.relatedTarget.getAttribute("data-bs-name");
            editShelfConfirm.current.onclick = () => {
                const path = editShelfPath.current.value;
                const name = editShelfName.current.value;
                editShelf(id, path, name).then(res => props.refresh(), err => console.error(err));
            };
        });
    }, []);

    return (
        <div className={"modal fade"} id={"edit-shelf-modal"} tabIndex={-1} aria-labelledby={"edit-shelf-modal-label"}
             aria-hidden={true} ref={editShelfModal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"edit-shelf-modal-label"}>Edit shelf</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <div className="mb-2">
                            <label htmlFor="edit-path" className="form-label">Path</label>
                            <input ref={editShelfPath} type="text" className="form-control" id="edit-path"
                                   aria-describedby="edit-path-help"/>
                            <div id="edit-path-help" className="form-text">Insert a folder without the / at the
                                end.
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="edit-name" className="form-label">Name</label>
                            <input ref={editShelfName} type="text" className="form-control" id="edit-name"/>
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal"
                                ref={editShelfConfirm}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShelfEditModal;
