import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import image from "../images/error.svg"

function ErrorPage(props) {

    return (
        <main className="flex-grow-1 p-3 text-center">
            <h1>{props.title}</h1>
            <div className="w-50 m-auto py-5">
                <img src={image} alt="Error logo" className="img-fluid" />
            </div>
            <Link to={props.link} className="btn btn-lg btn-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="pe-2"/>
                {props.name}
            </Link>
        </main>
    );

}
export default ErrorPage;
