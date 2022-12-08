import LibraryItem from "../LibraryItem";

function ShelfContent(props) {
    const {books, id} = props;

    return(
        <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 ${id === undefined ? "d-none" : ""}`}>
            <div className={"scroll-pane-inner row mx-0"}>
                {books.map(b =>
                    <div className={"col-auto p-2"} key={b.id}>
                        <LibraryItem book={b}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShelfContent;
