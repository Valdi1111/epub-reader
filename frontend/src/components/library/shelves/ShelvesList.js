import ShelfItem from "./ShelfItem";
import ShelfButtons from "./ShelfButtons";

function ShelvesList(props) {
    const {shelves, id} = props;

    return(
        <div className={`d-md-flex flex-column col-12 col-md-4 col-lg-3 ${id !== undefined ? "d-none" : "d-flex"}`}>
            <div className={"flex-grow-1 scroll-pane"}>
                <ul className={"scroll-pane-inner list-group list-group-flush"}>
                    {shelves.map(s => <ShelfItem key={s.id} shelf={s} active={s.id == id}/>)}
                </ul>
            </div>
            <div className={"d-flex flex-row border-top p-2"}>
                <ShelfButtons shelf={shelves.filter(s => s.id == id)[0]} active={id !== undefined}/>
            </div>
        </div>
    );
}

export default ShelvesList;
