import $ from "jquery";
import {useEffect, useRef} from "react";
import {THEME, THEMES} from "../../Settings";

function ThemeChangeModal(props) {
    const {settings, setSetting} = props;
    const modal = useRef();

    useEffect(() => {
        modal.current.addEventListener("hidden.bs.modal", (e) => {
            $("div.modal-body input[name='select-theme']").prop("checked", false);
            $("#theme-" + $("html").attr("data-theme")).prop("checked", true);
        });
    }, []);

    function confirm() {
        const theme = $("div.modal-body input[name='select-theme']:checked");
        setSetting(THEME, theme.val());
    }

    function Theme(t) {
        const {id, name} = t;
        return (
            <div className={"form-check"}>
                <input className={"form-check-input"} type={"radio"} id={"theme-" + id} name={"select-theme"}
                       defaultChecked={settings[THEME] === id} value={id}/>
                <label className={"w-100 form-check-label"} htmlFor={"theme-" + id}>{name}</label>
            </div>
        );
    }

    return (
        <div className={"modal fade"} id={"theme-change-modal"} tabIndex={-1} aria-hidden={true}
             aria-labelledby={"theme-change-modal-label"} ref={modal}>
            <div className={"modal-dialog"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"} id={"theme-change-modal-label"}>Change theme</h5>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}
                                aria-label={"Close"}/>
                    </div>
                    <div className={"modal-body"}>
                        {THEMES.map(t => <Theme key={t.theme} id={t.theme} name={t.name}/>)}
                    </div>
                    <div className={"modal-footer"}>
                        <button type={"button"} className={"btn btn-danger"} data-bs-dismiss={"modal"}>
                            Close
                        </button>
                        <button type={"button"} className={"btn btn-primary"} data-bs-dismiss={"modal"}
                                onClick={confirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ThemeChangeModal;
