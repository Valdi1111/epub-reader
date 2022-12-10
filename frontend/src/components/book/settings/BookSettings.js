import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import SettingsFont from "./SettingsFont";
import SettingsFontSize from "./SettingsFontSize";
import SettingsSpacing from "./SettingsSpacing";
import SettingsMargins from "./SettingsMargins";
import SettingsWidth from "./SettingsWidth";
import SettingsForceFont from "./SettingsForceFont";
import SettingsForceFontSize from "./SettingsForceFontSize";
import SettingsFullJustification from "./SettingsFullJustification";
import SettingsLayout from "./SettingsLayout";

function BookSettings(props) {
    const {settings, setSetting} = props;

    return (
        <div className={"dropdown"}>
            <button className={"top_bar_hover btn-icon btn btn-outline-secondary"} type={"button"}
                    id={"settings-dropdown"} data-bs-toggle={"dropdown"} aria-expanded={false}>
                <FontAwesomeIcon icon={faGear} width={16} height={16}/>
            </button>
            <div className={"dropdown-menu"} aria-labelledby={"settings-dropdown"} style={{width: "300px"}}
                 onClick={e => e.stopPropagation()}>
                <SettingsFont settings={settings} setSetting={setSetting}/>
                <SettingsFontSize settings={settings} setSetting={setSetting}/>
                <SettingsSpacing settings={settings} setSetting={setSetting}/>
                <SettingsMargins settings={settings} setSetting={setSetting}/>
                <SettingsWidth settings={settings} setSetting={setSetting}/>
                <SettingsForceFont settings={settings} setSetting={setSetting}/>
                <SettingsForceFontSize settings={settings} setSetting={setSetting}/>
                <SettingsFullJustification settings={settings} setSetting={setSetting}/>
                <SettingsLayout settings={settings} setSetting={setSetting}/>
            </div>
        </div>
    );

}

export default BookSettings;
