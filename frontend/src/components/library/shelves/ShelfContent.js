import LibraryItem from "../LibraryItem";

function ShelfContent(props) {
    const {elements, id} = props;

    function Section(props) {
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

    function getSections() {
        let e = [];
        let num = 0;
        for (let key in elements) {
            let val = elements[key];
            e = [...e, <Section key={key} uid={num} shelf={key} books={val}/>];
            num++;
        }
        return e;
    }

    return (
        <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 ${id === undefined ? "d-none" : ""}`}>
            <div id={"sections-accordion"} className={"scroll-pane-inner accordion accordion-flush"}>
                {getSections()}
            </div>
        </div>
    );
}

export default ShelfContent;
