import {useEffect, useState} from "react";
import $ from "jquery";

function ContentSearch(props) {
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

    function SearchItem(props) {
        const {i} = props
        return (
            <li className={"dropdown-item"} onClick={e => navigateTo(i.cfi)}>
                <p className={"text-wrap text-muted mb-0"} style={{fontSize: "85%"}}>{i.chapter}</p>
                <span className={"text-wrap"}>{i.excerpt}</span>
            </li>
        );
    }

    return (
        <>
            <div className={"dropdown-header pt-1 pb-0"}>
                <input className={"form-control mb-1"} id={"search"} type="text" placeholder={"Search"}/>
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
            <ul className={"list-unstyled overflow-auto mb-1"} style={{maxHeight: "500px"}}>
                {searchResults.map(i => <SearchItem key={i.cfi} i={i}/>)}
            </ul>
            <span className={"dropdown-header text-muted py-0"}>{searchResults.length + " results"}</span>
        </>
    );

}

export default ContentSearch;
