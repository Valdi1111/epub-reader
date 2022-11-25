import {FONT_SIZE} from "../../Settings";

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
                    {[...Array(25).keys()].map(i =>
                        <option key={i + 6} value={i + 6}>{i + 6}</option>
                    )}
                </select>
            </div>
        </div>
    );

}

export default SettingsFontSize;
