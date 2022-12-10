import LibraryItem from "../LibraryItem";

function ShelvesContentSection(props) {
    const {uid, shelf, books} = props;
    const headId = "section-header-" + uid;
    const bodyId = "section-body-" + uid;

    return (
        <div className={"accordion-item"}>
            <h2 id={headId} className={"accordion-header"}>
                <button className={"accordion-button"} type={"button"} data-bs-toggle={"collapse"}
                        data-bs-target={`#${bodyId}`} aria-expanded={true} aria-controls={bodyId}>
                    {shelf}
                </button>
            </h2>
            <div id={bodyId} className={"accordion-collapse collapse show"} aria-labelledby={headId}>
                <div className={"accordion-body row mx-0 p-0"}>
                    {books.map(b =>
                        <div className={"col-auto p-2"} key={b.id}>
                            <LibraryItem book={b}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ShelvesContentSection;
