import {FONT, FONTS} from "../../Settings";

function SettingsFont(props) {
    const {settings, setSetting} = props;

    function font(e) {
        setSetting(FONT, e.target.value);
    }

    function getFonts() {
        let e = [];
        for (let id in FONTS) {
            e = [...e, <option key={id} value={id}>{FONTS[id]}</option>];
        }
        return e;
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Font</label>
            <div className={"col-8"}>
                <select id={"input-font"} className={"form-select"} defaultValue={settings[FONT]} onChange={font}>
                    {getFonts()}
                </select>
            </div>
        </div>
    );

}

export default SettingsFont;
