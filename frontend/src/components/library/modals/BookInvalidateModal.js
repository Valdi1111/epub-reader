import {useEffect, useRef, useState} from "react";
import {invalidateCache} from "../../Api";

function BookInvalidateModal() {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("...");
    const [url, setUrl] = useState("...");
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            setUrl(e.relatedTarget.getAttribute("data-bs-url"));
            setId(e.relatedTarget.getAttribute("data-bs-id"));
            setTitle(e.relatedTarget.getAttribute("data-bs-title"));
        });
    }, []);

    function confirm() {
        if (id === null) {
            return;
        }
        invalidateCache(url, id).then(
            res => console.log("Book", res, "Cache recreated successfully!"),
            err => console.error(err)
        );
    }

    return (
        <div className={"modal fade"} id={"invalid-modal"} tabIndex={-1} aria-labelledby={"invalid-modal-label"}
             aria-hidden={true} ref={modal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"invalid-modal-label"}>Confirm cache recreation</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <h6>{title}</h6>
                        <p className={"mb-0"}>Are you sure you want to recreate the cache for this book?</p>
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

export default BookInvalidateModal;
