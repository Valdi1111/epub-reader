import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {SPACING} from "../../Settings";

function SettingsSpacing(props) {
    const {settings, setSetting} = props;

    function spacing(e, up) {
        const input = $("#input-spacing");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(SPACING, input.val());
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Spacing</label>
            <div className={"col-8"}>
                <div className={"input-group"}>
                    <input id={"input-spacing"} className={"form-control"} type={"number"} disabled={true}
                           defaultValue={settings[SPACING]} step={0.05} min={1.00}/>
                    <button className={"btn btn-outline-danger"} onClick={e => spacing(e, false)}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <button className={"btn btn-outline-success"} onClick={e => spacing(e, true)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SettingsSpacing;
