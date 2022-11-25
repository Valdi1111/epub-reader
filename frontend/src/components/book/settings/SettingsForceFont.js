import {FORCE_FONT} from "../../Settings";

function SettingsForceFont(props) {
    const {settings, setSetting} = props;

    function forceFont(e) {
        setSetting(FORCE_FONT, e.target.checked ? "true" : "false");
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <div className={"col"}>
                <div className={"form-check"}>
                    <input id={"input-force-font"} className={"form-check-input"} type={"checkbox"} onChange={forceFont}
                           defaultChecked={settings[FORCE_FONT] === "true"}/>
                    <label className="form-check-label" htmlFor={"input-force-font"}>Force font</label>
                </div>
            </div>
        </div>
    );

}

export default SettingsForceFont;
