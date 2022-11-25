import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

function BookFooter(props) {
    const {chapter, chapterName, location, percentage, left, right} = props;

    return (
        <footer id={"bottom_bar"} className={"p-2 border-top d-flex flex-row align-items-center"}>
            <button className={"bottom_bar_hover btn-normal btn btn-outline-secondary"} onClick={left} title={"Prev"}>
                <FontAwesomeIcon icon={faAngleLeft} width={16} height={16}/>
            </button>
            <p id={"book-location"} className={"col mb-0 text-center text-truncate px-2"}>
                {location}
            </p>
            <p id={"book-chapter"} className={"d-none d-md-block col mb-0 text-center text-truncate px-2"}
               title={chapterName}>
                {chapterName}
            </p>
            <button className={"bottom_bar_hover btn-normal btn btn-outline-secondary"} onClick={right} title={"Next"}>
                <FontAwesomeIcon icon={faAngleRight} width={16} height={16}/>
            </button>
        </footer>
    );
}

export default BookFooter;
