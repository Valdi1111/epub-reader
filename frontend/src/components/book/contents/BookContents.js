import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faListSquares, faPencil, faBookmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import ContentToc from "./ContentToc";
import ContentSearch from "./ContentSearch";
import {useState} from "react";

function BookContents(props) {
    const {chapterName, navigation, navigateTo, search} = props;
    const [content, setContent] = useState("toc");

    function cntChange(e) {
        setContent(e.target.value);
    }

    function Content() {
        if(content === "toc") {
            return <ContentToc chapterName={chapterName} navigation={navigation} navigateTo={navigateTo}/>
        }
        if(content === "annotations") {
            return <></>
        }
        if(content === "bookmarks") {
            return <></>
        }
        if(content === "search") {
            return <ContentSearch navigateTo={navigateTo} search={search}/>
        }
    }

    return (
        <div className={"dropdown"}>
            <button className={"top_bar_hover btn-normal btn btn-outline-secondary"} type={"button"} id={"ctn-dropdown"}
                    data-bs-toggle={"dropdown"} aria-expanded={false} title={"Contents"}>
                <FontAwesomeIcon icon={faBars} width={16} height={16}/>
            </button>
            <div className={"dropdown-menu"} aria-labelledby={"ctn-dropdown"} style={{width: "350px"}} onClick={e => e.stopPropagation()}>
                <div className={"btn-group w-100 px-2"} role={"group"} aria-label={"Contents button group"}>
                    <input type={"radio"} className={"btn-check"} name={"cnt-radio"} id={"cnt-toc"} autoComplete={"off"}
                           defaultChecked={true} onChange={cntChange} value={"toc"}/>
                    <label className={"btn btn-outline-secondary btn-normal"} htmlFor={"cnt-toc"}>
                        <FontAwesomeIcon icon={faListSquares} width={16} height={16}/>
                    </label>
                    <input type={"radio"} className={"btn-check"} name={"cnt-radio"} id={"cnt-annotations"}
                           autoComplete={"off"} onChange={cntChange} value={"annotations"}/>
                    <label className={"btn btn-outline-secondary btn-normal"} htmlFor={"cnt-annotations"}>
                        <FontAwesomeIcon icon={faPencil} width={16} height={16}/>
                    </label>
                    <input type={"radio"} className={"btn-check"} name={"cnt-radio"} id={"cnt-bookmarks"}
                           autoComplete={"off"} onChange={cntChange} value={"bookmarks"}/>
                    <label className={"btn btn-outline-secondary btn-normal"} htmlFor={"cnt-bookmarks"}>
                        <FontAwesomeIcon icon={faBookmark} width={16} height={16}/>
                    </label>
                    <input type={"radio"} className={"btn-check"} name={"cnt-radio"} id={"cnt-search"}
                           autoComplete={"off"} onChange={cntChange} value={"search"}/>
                    <label className={"btn btn-outline-secondary btn-normal"} htmlFor={"cnt-search"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} width={16} height={16}/>
                    </label>
                </div>
                <hr className={"my-2"}/>
                <Content/>
            </div>
        </div>
    );

}

export default BookContents;
