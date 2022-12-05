import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {MARGINS} from "../../Settings";

function SettingsMargins(props) {
    const {settings, setSetting} = props;

    function margins(e, up) {
        const input = $("#input-margins");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(MARGINS, input.val());
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Margins</label>
            <div className={"col-8"}>
                <div className={"input-group"}>
                    <input id={"input-margins"} className={"form-control"} type={"number"} disabled={true}
                           defaultValue={settings[MARGINS]} step={20} min={0}/>
                    <button className={"btn btn-outline-danger btn-icon"} onClick={e => margins(e, false)}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <button className={"btn btn-outline-success btn-icon"} onClick={e => margins(e, true)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SettingsMargins;
