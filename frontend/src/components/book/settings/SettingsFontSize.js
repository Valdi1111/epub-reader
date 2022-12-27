import {FONT_SIZE, FONT_SIZES} from "../../Settings";

function SettingsFontSize(props) {
    const {settings, setSetting} = props;

    function fontSize(e) {
        setSetting(FONT_SIZE, e.target.value);
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <label className={"col-4 col-form-label"}>Font size</label>
            <div className={"col-8"}>
                <select id={"input-font"} className={"form-select"} defaultValue={settings[FONT_SIZE]} onChange={fontSize}>
                    {FONT_SIZES.map(i =>
                        <option key={i} value={i}>{i}</option>
                    )}
                </select>
            </div>
        </div>
    );

}

export default SettingsFontSize;
