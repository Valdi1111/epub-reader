import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {COVERS_URL, formatReadPercent, markRead, markUnread} from "../Api";
import {useState} from "react";
import LibraryItemCover from "./LibraryItemCover";

function LibraryItem(props) {
    const {id, shelf, url, title, creator, cover, total} = props.book;
    const [page, setPage] = useState(props.book.page);

    function ItemProgress() {
        if (page === -1) {
            return <FontAwesomeIcon icon={faCheckCircle} width={16} height={16} className={"text-success"}/>
        }
        return <span className={"text-secondary"}>{formatReadPercent(page, total)}</span>;
    }

    /**
     * Dropdown menu - go to shelf
     * @returns {JSX.Element}
     * @constructor
     */
    function ItemGoToShelf() {
        if (!shelf) {
            return <></>;
        }
        return <li><Link className={"dropdown-item"} to={`/library/shelves/${shelf}`}>Go to shelf</Link></li>;
    }

    /**
     * Dropdown menu - about
     * @returns {JSX.Element}
     * @constructor
     */
    function ItemAbout() {
        return (
            <li className={"cursor-pointer"}>
                <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#info-modal"}
                      data-bs-id={id} data-bs-cover={cover} data-bs-url={url}>
                    About this book
                </span>
            </li>
        );
    }

    /**
     * Dropdown menu - mark as read/unread
     * @returns {JSX.Element}
     * @constructor
     */
    function ItemMarkRead() {
        if (page === -1) {
            return (
                <li className={"cursor-pointer"}>
                    <span className={"dropdown-item"} onClick={e => markUnread(id).then(res => setPage(0))}>
                        Mark as Unread
                    </span>
                </li>
            );
        }
        return (
            <li className={"cursor-pointer"}>
                <span className={"dropdown-item"} onClick={e => markRead(id).then(res => setPage(-1))}>
                    Mark as Read
                </span>
            </li>
        );
    }

    /**
     * Dropdown menu - recreate cache
     * @returns {JSX.Element}
     * @constructor
     */
    function ItemRecreate() {
        return (
            <li className={"cursor-pointer"}>
                <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#invalid-modal"}
                      data-bs-id={id} data-bs-title={title} data-bs-url={url}>
                    Recreate cache
                </span>
            </li>
        );
    }

    /**
     * Dropdown menu - remove
     * @returns {JSX.Element}
     * @constructor
     */
    function ItemRemove() {
        return (
            <li className={"cursor-pointer"}>
                <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#delete-modal"}
                      data-bs-id={id} data-bs-title={title}>
                    Remove
                </span>
            </li>
        );
    }

    // TODO rendere variabile la dimensione del libro e della cover
    return (
        <div className={"d-flex flex-column"} style={{width: "150px"}}>
            <LibraryItemCover id={id} cover={cover} title={title} creator={creator}/>
            <div className={"d-flex flex-row justify-content-between align-items-center mt-1"}>
                <ItemProgress/>
                <div className="dropdown">
                    <button className={"btn btn-outline-secondary px-2 py-0"} id={"book-other"}
                            type={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}>
                        <FontAwesomeIcon icon={faEllipsis} width={16} height={16}/>
                    </button>
                    <ul className={"dropdown-menu"} aria-labelledby={"book-other"}>
                        <ItemGoToShelf/>
                        <ItemAbout/>
                        <ItemMarkRead/>
                        <ItemRecreate/>
                        <ItemRemove/>
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default LibraryItem;
