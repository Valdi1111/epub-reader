import LibraryItem from "../LibraryItem";

function ShelfContent(props) {
    const {elems, id} = props;

    function Section(props) {
        const {shelf, books} = props;
        return (
            <>
                <p className={"text-center fw-bold p-2 mb-0 mt-2"}>{shelf}</p>
                <div className={"row mx-0"}>
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
        for (let key in elems) {
            let val = elems[key];
            e = [...e, <Section key={key} shelf={key} books={val}/>];
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
