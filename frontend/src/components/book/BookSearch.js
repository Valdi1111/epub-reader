import {useEffect, useState} from "react";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

function BookSearch(props) {
    const {navigateTo, search} = props;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const s = $("#search");
        s.keydown(e => {
            let code = e.keyCode || e.which;
            if (code === 13) {
                if (!s.val()) {
                    setSearchResults([]);
                    return;
                }
                const searchType = $("input[name='search-type']:checked");
                const promise = search(s.val(), searchType.val() === "all");
                promise.then(result => setSearchResults(result));
            }
        });
    }, []);


    return (
        <div className={"dropdown"}>
            <button className={"top_bar_hover btn-normal btn btn-outline-secondary me-2"} type={"button"}
                    id={"search-dropdown"} data-bs-toggle={"dropdown"} aria-expanded={false}>
                <FontAwesomeIcon icon={faMagnifyingGlass} width={16} height={16}/>
            </button>
            <div className={"dropdown-menu"} aria-labelledby={"search-dropdown"} style={{width: "330px"}}>
                <div className={"dropdown-header"}>
                    <input className={"form-control mb-1"} id={"search"} type="text" placeholder={"Search"}/>
                    <div className="form-check form-check-inline">
                        <input className={"form-check-input"} name="search-type" type={"radio"} value={"all"}
                               defaultChecked={true}/>
                        <label className={"form-check-label"}>All chapters</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={"form-check-input"} name="search-type" type={"radio"} value={"chapter"}/>
                        <label className={"form-check-label"}>Current chapter</label>
                    </div>
                </div>
                <ul className={"list-unstyled overflow-auto mb-1"} style={{maxHeight: "600px"}}>
                    {searchResults.map(i =>
                        <li key={i.cfi} className={"dropdown-item"} onClick={e => navigateTo(i.cfi)}>
                            <p className={"text-wrap text-muted mb-1"} tyle={{fontSize: "85%"}}>{i.chapter}</p>
                            <span className={"text-wrap"}>{i.excerpt}</span>
                        </li>
                    )}
                </ul>
                <span className={"dropdown-header text-muted"}>{searchResults.length + " results"}</span>
            </div>
        </div>
    );

}

export default BookSearch;
