import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function ShelvesListButtons(props) {
    const {active, shelf} = props;

    function AddButton() {
        return (
            <button className={"btn btn-success btn-icon"}
                    type={"button"} data-bs-toggle={"modal"} data-bs-target={"#shelf-add-modal"}>
                <FontAwesomeIcon icon={faPlus} width={16} height={16}/>
            </button>
        );
    }

    function EditButton() {
        if(!shelf) {
            return <></>
        }
        return (
            <button className={"btn btn-primary btn-icon ms-auto"} type={"button"} data-bs-toggle={"modal"}
                    data-bs-target={"#shelf-edit-modal"} data-bs-path={shelf.path} data-bs-name={shelf.name}
                    data-bs-id={shelf.id}>
                <FontAwesomeIcon icon={faPencil} width={16} height={16}/>
            </button>
        );
    }

    function DeleteButton() {
        if(!shelf) {
            return <></>
        }
        return (
            <button className={"btn btn-danger btn-icon ms-2"} type={"button"} data-bs-toggle={"modal"}
                    data-bs-target={"#shelf-delete-modal"} data-bs-name={shelf.name} data-bs-id={shelf.id}>
                <FontAwesomeIcon icon={faTrash} width={16} height={16}/>
            </button>
        );
    }

    if (!active) {
        return <AddButton/>;
    }

    return (
        <>
            <AddButton/>
            <EditButton/>
            <DeleteButton/>
        </>
    );
}

export default ShelvesListButtons;
