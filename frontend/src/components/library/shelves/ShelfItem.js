import {Link} from "react-router-dom";

function ShelfItem(props) {
    const {shelf, active} = props;

    function isActive() {
        if (active) {
            return "active";
        }
        return "";
    }

    return (
        <li data-id={shelf.id} title={shelf.name} className={`list-group-item p-0 ${isActive()}`}>
            <Link className={"d-flex flex-row justify-content-between align-items-start py-2 px-3"}
                  to={`/library/shelves/${shelf.id}`}>
                <div className={"min-width-0"}>
                    <p className={"fw-bold mb-0"}>{shelf.name}</p>
                    <p className={"small mb-0 text-truncate"}>Folder: {shelf.path}/</p>
                </div>
                <span className={"badge bg-primary rounded-pill"}>{shelf.books}</span>
            </Link>
        </li>
    );
}

export default ShelfItem;
