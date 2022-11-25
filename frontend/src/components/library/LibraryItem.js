import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {COVERS_URL, formatReadPercent} from "../Api";

function LibraryItem(props) {
    const {id, shelf, url, title, creator, cover, page, total, read} = props.book;

    function ItemCover() {
        if (cover) {
            return (
                <Link className={"d-flex justify-content-center align-items-center"} style={{height: "225px"}}
                      title={title} to={`/books/${id}`}>
                    <img className={"img-fluid mt-auto"} alt={"cover"} src={COVERS_URL + cover}/>
                </Link>
            );
        }
        return (
            <Link className={"d-flex justify-content-center align-items-center border"} style={{height: "225px"}}
                  title={title} to={`/books/${id}`}>
                <div className={"h-100 d-flex flex-column justify-content-center py-3"}>
                    <p className={"overflow-hidden border-top border-bottom p-2 mb-1"}
                       style={{fontWeight: 500, fontSize: "95%"}}>
                        {title}
                    </p>
                    <span className={"small align-self-end px-2"}>{creator}</span>
                </div>
            </Link>
        );
    }

    function ItemRead() {
        if(read) {
            return <FontAwesomeIcon icon={faCheckCircle} width={16} height={16} className={"text-success"}/>
        }
        return <span className={"text-secondary"}>{formatReadPercent(page, total)}</span>;
    }

    function ItemGoToShelf() {
        if (!shelf) {
            return <></>;
        }
        return <li><Link className={"dropdown-item"} to={`/library/shelves/${shelf}`}>Go to shelf</Link></li>;
    }

    return (
        <div className={"d-flex flex-column"} style={{width: "150px"}}>
            <ItemCover/>
            <div className={"d-flex flex-row justify-content-between align-items-center mt-1"}>
                <ItemRead/>
                <div className="dropdown">
                    <button className={"btn btn-outline-secondary px-2 py-0"} id={"book-other"}
                            type={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}>
                        <FontAwesomeIcon icon={faEllipsis} width={16} height={16}/>
                    </button>
                    <ul className={"dropdown-menu"} aria-labelledby={"book-other"}>
                        <ItemGoToShelf/>
                        <li className={"cursor-pointer"}>
                            <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#info-modal"}
                                  data-bs-id={id} data-bs-cover={cover} data-bs-url={url}>
                                About this book
                            </span>
                        </li>
                        <li className={"cursor-pointer"}>
                            <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#invalid-modal"}
                                  data-bs-id={id} data-bs-title={title} data-bs-url={url}>
                                Recreate cache
                            </span>
                        </li>
                        <li className={"cursor-pointer"}>
                            <span className={"dropdown-item"} data-bs-toggle={"modal"} data-bs-target={"#delete-modal"}
                                  data-bs-id={id} data-bs-title={title}>
                                Remove
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default LibraryItem;
