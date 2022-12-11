import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../images/avatar.png";
import {useEffect} from "react";
import $ from "jquery";

function LibraryHeader(props) {
    const location = useLocation();

    useEffect(() => {
        $("nav.nav-pills > .nav-link").removeClass("active").removeAttr("aria-current");
        let num = 0;
        if (location.pathname.startsWith("/library/all")) {
            num = 1;
        }
        if (location.pathname.startsWith("/library/shelves")) {
            num = 2;
        }
        if (location.pathname.startsWith("/library/not-in-shelf")) {
            num = 3;
        }
        if (num !== 0) {
            $(`#pc-nav > .nav-link:nth-child(${num})`).addClass("active").attr("aria-current", "page");
            $(`#mobile-nav > .nav-link:nth-child(${num + 1})`).addClass("active").attr("aria-current", "page");
        }
    }, [location]);

    function collapseNav(e) {
        const nav = e.target.parentElement;
        if (nav.classList.contains("show")) {
            new bootstrap.Collapse(nav).hide();
        }
    }

    function logout() {
        window.localStorage.removeItem("token");
        props.logout();
    }

    return (
        <div className={"border-bottom"}>
            <div className={"d-flex align-items-center justify-content-between p-2"}>
                <button type={"button"} className={"d-md-none btn btn-icon btn-outline-secondary"}
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
                                  data-bs-target={"#book-add-modal"}>
                                Add
                            </span>
                        </li>
                        <li>
                            <span className={"dropdown-item cursor-pointer"} data-bs-toggle={"modal"}
                                  data-bs-target={"#theme-change-modal"}>
                                Theme
                            </span>
                        </li>
                        <li>
                            <hr className={"dropdown-divider"}/>
                        </li>
                        <li>
                            <span className={"dropdown-item cursor-pointer"} onClick={logout}>
                                Sign out
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className={"flex-column d-md-none nav-pills collapse navbar-collapse"} id={"mobile-nav"}>
                <div className={"w-100 border-top"}/>
                <Link to={"/library/all"} className={"nav-link text-center m-2"} onClick={collapseNav}>
                    All books
                </Link>
                <Link to={"/library/shelves"} className={"nav-link text-center m-2"} onClick={collapseNav}>
                    Shelves
                </Link>
                <Link to={"/library/not-in-shelf"} className={"nav-link text-center m-2"} onClick={collapseNav}>
                    Not in shelf
                </Link>
            </nav>
        </div>
    )
}

export default LibraryHeader;
