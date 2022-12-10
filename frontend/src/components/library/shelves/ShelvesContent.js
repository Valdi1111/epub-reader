import ShelvesContentSection from "./ShelvesContentSection";

function ShelvesContent(props) {
    const {id, content} = props;

    function getSections() {
        let e = [];
        let num = 0;
        for (let key in content) {
            let val = content[key];
            e = [...e, <ShelvesContentSection key={key} uid={num} shelf={key} books={val}/>];
            num++;
        }
        return e;
    }

    return (
        <div className={`d-md-block scroll-pane col-12 col-md-8 col-lg-9 ${id === undefined ? "d-none" : ""}`}>
            <div className={"scroll-pane-inner accordion accordion-flush"}>
                {getSections()}
            </div>
        </div>
    );
}

export default ShelvesContent;
