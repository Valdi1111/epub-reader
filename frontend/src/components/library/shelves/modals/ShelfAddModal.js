import {useRef} from "react";
import {addShelf} from "../../../Api";

function ShelfAddModal(props) {
    const path = useRef();
    const name = useRef();

    function confirm() {
        addShelf(path.current.value, name.current.value).then(
            res => props.refresh(),
            err => console.error(err)
        );
    }

    return (
        <div className={"modal fade"} id={"add-shelf-modal"} tabIndex={-1} aria-labelledby={"add-shelf-modal-label"}
             aria-hidden={true}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"add-shelf-modal-label"}>Create new shelf</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <div className="mb-2">
                            <label htmlFor="add-path" className="form-label">Path</label>
                            <input ref={path} type="text" className="form-control" id="add-path"
                                   aria-describedby="add-path-help"/>
                            <div id="add-path-help" className="form-text">Insert a folder without the / at the
                                end.
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="add-name" className="form-label">Name</label>
                            <input ref={name} type="text" className="form-control" id="add-name"/>
                        </div>
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal" onClick={confirm}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShelfAddModal;
