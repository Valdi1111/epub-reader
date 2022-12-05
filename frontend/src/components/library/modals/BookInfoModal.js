import {useEffect, useRef} from "react";
import {COVERS_URL, getBookMetadata} from "../../Api";

function BookInfoModal() {
    const infoModal = useRef();
    const infoCover = useRef();
    const infoTitle = useRef();
    const infoCreator = useRef();
    const infoPath = useRef();
    const infoPublisher = useRef();
    const infoPublication = useRef();
    const infoModified = useRef();
    const infoLanguage = useRef();
    const infoIdentifier = useRef();
    const infoCopyright = useRef();

    useEffect(() => {
        infoModal.current.addEventListener("show.bs.modal", (e) => {
            const id = e.relatedTarget.getAttribute("data-bs-id");
            infoCover.current.src = COVERS_URL + e.relatedTarget.getAttribute("data-bs-cover");
            infoPath.current.textContent = e.relatedTarget.getAttribute("data-bs-url");
            getBookMetadata(id).then(
                res => {
                    infoTitle.current.textContent = res.data.title;
                    infoCreator.current.textContent = res.data.creator;
                    infoPublisher.current.textContent = res.data.publisher;
                    infoPublication.current.textContent = res.data.pubdate;
                    infoModified.current.textContent = res.data.modified_date;
                    infoLanguage.current.textContent = res.data.language;
                    infoIdentifier.current.textContent = res.data.identifier;
                    infoCopyright.current.textContent = res.data.rights;
                },
                err => console.error(err)
            );
        });
    }, []);

    return (
        <div className={"modal fade"} id={"info-modal"} tabIndex={-1} aria-labelledby={"info-modal-label"}
             aria-hidden={true} ref={infoModal}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"info-modal-label"}>About this book</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <div className={"row"}>
                            <div className={"col-4 mb-2"}>
                                <img ref={infoCover} className={"img-fluid"} alt={"Book image"}/>
                            </div>
                            <div className={"col-8"}>
                                <h5 ref={infoTitle} className={"mb-1"}>...</h5>
                                <p ref={infoCreator}>...</p>
                            </div>
                            <div className={"col-12"}>
                                <p className={"text-muted small mb-0"}>Path</p>
                                <p ref={infoPath}>...</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <p className={"text-muted small mb-0"}>Publisher</p>
                                <p ref={infoPublisher}>...</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <p className={"text-muted small mb-0"}>Publication Date</p>
                                <p ref={infoPublication}>...</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <p className={"text-muted small mb-0"}>Modified Date</p>
                                <p ref={infoModified}>...</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <p className={"text-muted small mb-0"}>Language</p>
                                <p ref={infoLanguage}>...</p>
                            </div>
                            <div className={"col-12"}>
                                <p className={"text-muted small mb-0"}>Identifier</p>
                                <p ref={infoIdentifier}>...</p>
                            </div>
                            <div className={"col-12"}>
                                <p className={"text-muted small mb-0"}>Copyright</p>
                                <p ref={infoCopyright}>...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookInfoModal;
