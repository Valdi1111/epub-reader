import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {WIDTH} from "../../Settings";

function SettingsWidth(props) {
    const {settings, setSetting} = props;

    function width(e, up) {
        const input = $("#input-width");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(WIDTH, input.val());
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Width</label>
            <div className={"col-8"}>
                <div className={"input-group"}>
                    <input id={"input-width"} className={"form-control"} type={"number"} disabled={true}
                           defaultValue={settings[WIDTH]} step={100} min={0}/>
                    <button className={"btn btn-outline-danger btn-icon"} onClick={e => width(e, false)}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <button className={"btn btn-outline-success btn-icon"} onClick={e => width(e, true)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SettingsWidth;
