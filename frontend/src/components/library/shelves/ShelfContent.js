import LibraryItem from "../LibraryItem";

function ShelfContent(props) {
    const {elements, id} = props;

    function Section(props) {
        const {uid, shelf, books} = props;
        return (
            <>
                <div className={"p-2"}>
                    <button className={"btn btn-outline-secondary w-100"} type={"button"} data-bs-toggle={"collapse"}
                            data-bs-target={`#${uid}`} aria-expanded={true} aria-controls={uid}>
                        {shelf}
                    </button>
                </div>
                <div id={uid} className={"collapse row mx-0 show"}>
                    {books.map(b =>
                        <div className={"col-auto p-2"} key={b.id}>
                            <LibraryItem book={b}/>
                        </div>
                    )}
                </div>
            </>
        );
    }

    function getSections() {
        let e = [];
        let num = 0;
        for (let key in elements) {
            let val = elements[key];
            e = [...e, <Section key={key} uid={`shelf-section-${num}`} shelf={key} books={val}/>];
            num++;
        }
        return e;
    }

    return (
        <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 ${id === undefined ? "d-none" : ""}`}>
            <div className={"scroll-pane-inner"}>
                {getSections()}
            </div>
        </div>
    );
}

export default ShelfContent;
