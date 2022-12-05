import {useEffect, useState} from "react";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";

function ContentSearch(props) {
    const {navigateTo, search} = props;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const s = $("#search");
        s.keydown(e => {
            let code = e.keyCode || e.which;
            if (code === 13) {
                goSearch();
            }
        });
    }, []);

    function goSearch() {
        const s = $("#search");
        if (!s.val()) {
            setSearchResults([]);
            return;
        }
        const searchType = $("input[name='search-type']:checked");
        const promise = search(s.val(), searchType.val() === "all");
        promise.then(result => setSearchResults(result));
    }

    function SearchItem(props) {
        const {i} = props
        return (
            <li className={"dropdown-item px-2"} onClick={e => navigateTo(i.cfi)}>
                <p className={"text-wrap text-muted mb-0"} style={{fontSize: "85%"}}>{i.chapter}</p>
                <span className={"text-wrap"}>{i.excerpt}</span>
            </li>
        );
    }

    return (
        <>
            <div className={"dropdown-header py-0 px-2"}>
                <div className={"input-group mb-1"}>
                    <input className={"form-control"} id={"search"} type="text" placeholder={"Search"}/>
                    <button className={"btn btn-outline-success btn-icon"} onClick={goSearch}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                </div>
                <div className="form-check form-check-inline">
                    <input className={"form-check-input"} name={"search-type"} type={"radio"} value={"all"}
                           defaultChecked={true}/>
                    <label className={"form-check-label"}>All chapters</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className={"form-check-input"} name="search-type" type={"radio"} value={"chapter"}/>
                    <label className={"form-check-label"}>Current chapter</label>
                </div>
            </div>
            <ul className={"list-unstyled overflow-auto mb-1"} style={{maxHeight: "400px"}}>
                {searchResults.map(i => <SearchItem key={i.cfi} i={i}/>)}
            </ul>
            <span className={"dropdown-header text-muted py-0 px-2"}>{searchResults.length + " results"}</span>
        </>
    );

}

export default ContentSearch;
