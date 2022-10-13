import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListSquares} from "@fortawesome/free-solid-svg-icons";

function BookNavigation(props) {
    const {chapterName, navigation, navigateTo} = props;

    function active(label) {
        if (label === chapterName) {
            return "active";
        }
        return "";
    }

    function NavItem(props) {
        const {i} = props
        return (
            <li className={"cursor-pointer"}>
                <span className={`dropdown-item text-truncate ${active(i.label)}`}
                      title={i.label} onClick={e => navigateTo(i.href)}>
                    {i.label}
                </span>
            </li>
        );
    }

    return (
        <div className={"dropdown"}>
            <button className={"top_bar_hover btn-normal btn btn-outline-secondary"} type={"button"} id={"nav-dropdown"}
                    data-bs-toggle={"dropdown"} aria-expanded={false}>
                <FontAwesomeIcon icon={faListSquares} width={16} height={16}/>
            </button>
            <div className={"dropdown-menu"} aria-labelledby={"nav-dropdown"} style={{width: "300px"}}>
                <ul className={"list-unstyled overflow-auto mb-0"} style={{maxHeight: "600px"}}>
                    {navigation.map(i => <NavItem key={i.id} i={i}/>)}
                </ul>
            </div>
        </div>
    );

}

export default BookNavigation;
