import $ from "jquery";
import {THEME} from "../Settings";

function ThemeChangeModal(props) {

    function changeTheme(e) {
        const theme = $("input[name='select-theme']:checked");
        props.setSetting(THEME, theme.val());
    }

    return (
        <div className={"modal fade"} id={"theme-modal"} tabIndex={-1} aria-labelledby={"theme-modal-label"}
             aria-hidden={true}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"theme-modal-label"}>Change theme</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}
                                aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        {props.themes.map(t =>
                            <div className={"form-check"} key={t.theme}>
                                <input className={"form-check-input"} type={"radio"} id={"select-theme-" + t.theme}
                                       defaultChecked={props.settings[THEME] === t.theme} name={"select-theme"}
                                       value={t.theme}/>
                                <label className={"w-100 form-check-label"} htmlFor={"select-theme-" + t.theme}>
                                    {t.name}
                                </label>
                            </div>
                        )}
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss="modal"
                                onClick={changeTheme}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ThemeChangeModal;
