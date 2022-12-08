import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../images/avatar.png";

function LibraryHeader(props) {

    function logout() {
        window.localStorage.removeItem("token");
        props.logout();
    }

    return (
        <div className={"border-bottom"}>
            <div className={"d-flex align-items-center justify-content-between p-2"} style={{height: "60px"}}>
                <button type={"button"} className={"btn-icon d-md-none btn btn-outline-secondary"}
                        data-bs-toggle={"collapse"} data-bs-target={"#mobile-nav"} aria-controls={"mobile-nav"}
                        aria-expanded={false} aria-label={"Toggle navigation"}>
                    <FontAwesomeIcon icon={faBars} width={16} height={16}/>
                </button>
                <nav className={"d-none d-md-flex flex-row nav-pills"} id={"pc-nav"}>
                    <Link to={"/library/all"} className={"nav-link text-center me-2"}>All books</Link>
                    <Link to={"/library/shelves"} className={"nav-link text-center me-2"}>Shelves</Link>
                    <Link to={"/library/not-in-shelf"} className={"nav-link text-center"}>Not in shelf</Link>
                </nav>
                <div className={"dropdown"}>
                    <div className={"link-secondary dropdown-toggle cursor-pointer"} id={"dropdown-user"}
                         data-bs-toggle={"dropdown"} aria-expanded={false}>
                        <img src={avatar} alt={"avatar"} width={40} height={40} className={"rounded-circle"}/>
                    </div>
                    <ul className={"dropdown-menu text-small"} aria-labelledby={"dropdown-user"}>
                        <li>
                            <span className={"dropdown-item cursor-pointer"} data-bs-toggle={"modal"}
                                  data-bs-target={"#add-modal"}>Add</span>
                        </li>
                        <li>
                            <span className={"dropdown-item cursor-pointer"} data-bs-toggle={"modal"}
                                  data-bs-target={"#theme-modal"}>Theme</span>
                        </li>
                        <li>
                            <hr className={"dropdown-divider"}/>
                        </li>
                        <li>
                            <span className={"dropdown-item cursor-pointer"} onClick={logout}>Sign out</span>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className={"flex-column d-md-none nav-pills collapse navbar-collapse"} id={"mobile-nav"}>
                <div className={"w-100 border-top"}/>
                <Link to={"/library/all"} className={"nav-link text-center m-2"}>All books</Link>
                <Link to={"/library/shelves"} className={"nav-link text-center m-2"}>Shelves</Link>
                <Link to={"/library/not-in-shelf"} className={"nav-link text-center m-2"}>Not in shelf</Link>
            </nav>
        </div>
    )
}

export default LibraryHeader;
