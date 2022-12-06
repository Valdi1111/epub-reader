import {Link} from "react-router-dom";
import {COVERS_URL} from "../Api";

function LibraryItemCover(props) {
    const {id, cover, title, creator} = props;
    if (cover) {
        return (
            <Link className={"d-flex justify-content-center align-items-center"} style={{height: "225px"}}
                  title={title} to={`/books/${id}`}>
                <img className={"img-fluid mt-auto"} alt={"cover"} src={COVERS_URL + cover}/>
            </Link>
        );
    }
    return (
        <Link className={"d-flex justify-content-center align-items-center border"} style={{height: "225px"}}
              title={title} to={`/books/${id}`}>
            <div className={"h-100 w-100 d-flex flex-column justify-content-center py-3"}>
                <p className={"overflow-hidden border-top border-bottom p-2 mb-1"}
                   style={{fontWeight: 500, fontSize: "95%"}}>
                    {title}
                </p>
                <span className={"small align-self-end px-2"}>{creator}</span>
            </div>
        </Link>
    );
}

export default LibraryItemCover;
