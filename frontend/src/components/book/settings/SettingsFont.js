import {FONT, FONTS} from "../../Settings";

function SettingsFont(props) {
    const {settings, setSetting} = props;

    function font(e) {
        setSetting(FONT, e.target.value);
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Font</label>
            <div className={"col-8"}>
                <select id={"input-font"} className={"form-select"} defaultValue={settings[FONT]} onChange={font}>
                    {FONTS.map(i =>
                        <option key={i} value={i}>{i}</option>
                    )}
                </select>
            </div>
        </div>
    );

}

export default SettingsFont;
