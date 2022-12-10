import {useEffect, useRef, useState} from "react";
import {COVERS_URL, getBookMetadata} from "../../Api";
import no_cover from "../../../images/missing-cover.png";

function BookInfoModal() {
    const [path, setPath] = useState("");
    const [cover, setCover] = useState(no_cover);
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publication, setPublication] = useState("");
    const [modified, setModified] = useState("");
    const [language, setLanguage] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [copyright, setCopyright] = useState("");
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("show.bs.modal", (e) => {
            const id = e.relatedTarget.getAttribute("data-bs-id");
            setPath(e.relatedTarget.getAttribute("data-bs-url"));
            if (e.relatedTarget.getAttribute("data-bs-cover") !== null) {
                setCover(COVERS_URL + e.relatedTarget.getAttribute("data-bs-cover"));
            } else {
                setCover(no_cover);
            }
            getBookMetadata(id).then(
                res => {
                    setTitle(res.data.title);
                    setCreator(res.data.creator);
                    setPublisher(res.data.publisher);
                    setPublication(res.data.pubdate);
                    setModified(res.data.modified_date);
                    setLanguage(res.data.language);
                    setIdentifier(res.data.identifier);
                    setCopyright(res.data.rights);
                },
                err => console.error(err)
            );
        });
        modal.current.addEventListener("hidden.bs.modal", (e) => {
            setPath("");
            setCover(no_cover);
            setTitle("");
            setCreator("");
            setPublisher("");
            setPublication("");
            setModified("");
            setLanguage("");
            setIdentifier("");
            setCopyright("");
        });
    }, []);

    return (
        <div className={"modal fade"} id={"book-info-modal"} tabIndex={-1} aria-hidden={true}
             aria-labelledby={"book-info-modal-label"} ref={modal}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"book-info-modal-label"}>About this book</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        <div className={"row"}>
                            <div className={"col-4 mb-2"}>
                                <img src={cover} className={"img-fluid"} alt={"Book image"}/>
                            </div>
                            <div className={"col-8"}>
                                <h6 className={"mb-1"}>{title}</h6>
                                <p className={"small"}>{creator}</p>
                            </div>
                            <div className={"col-12"}>
                                <h6 className={"small mb-0"}>Path</h6>
                                <p>{path}</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <h6 className={"small mb-0"}>Publisher</h6>
                                <p>{publisher}</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <h6 className={"small mb-0"}>Publication Date</h6>
                                <p>{publication}</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <h6 className={"small mb-0"}>Modified Date</h6>
                                <p>{modified}</p>
                            </div>
                            <div className={"col-12 col-sm-6"}>
                                <h6 className={"small mb-0"}>Language</h6>
                                <p>{language}</p>
                            </div>
                            <div className={"col-12"}>
                                <h6 className={"small mb-0"}>Identifier</h6>
                                <p>{identifier}</p>
                            </div>
                            <div className={"col-12"}>
                                <h6 className={"small mb-0"}>Copyright</h6>
                                <p>{copyright}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookInfoModal;
