import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {
    FONT, FONT_SIZE, FORCE_FONT_SIZE,
    JUSTIFY, LAYOUT,
    LAYOUT_AUTO,
    LAYOUT_CONTINUOUS,
    LAYOUT_SCROLLED,
    LAYOUT_SINGLE,
    MARGINS,
    SPACING,
    WIDTH
} from "../Settings";

function BookSettings(props) {
    const {settings, setSetting} = props;

    function font(e) {

    }

    function fontSize(e) {
        setSetting(FONT_SIZE, e.target.value);
    }

    function spacing(e, up) {
        const input = $("#input-spacing");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(SPACING, input.val());
    }

    function margins(e, up) {
        const input = $("#input-margins");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(MARGINS, input.val());
    }

    function width(e, up) {
        const input = $("#input-width");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        setSetting(WIDTH, input.val());
    }

    function justify(e) {
        setSetting(JUSTIFY, e.target.checked ? "true" : "false");
    }

    function forceFontSize(e) {
        setSetting(FORCE_FONT_SIZE, e.target.checked ? "true" : "false");
    }

    function layout(e) {
        setSetting(LAYOUT, e.target.value);
    }

    function isLayout(layout) {
        return settings[LAYOUT] === layout;
    }

    return (
        <div className={"dropdown"}>
            <button className={"top_bar_hover btn-normal btn btn-outline-secondary"} type={"button"}
                    id={"settings-dropdown"} data-bs-toggle={"dropdown"} aria-expanded={false}>
                <FontAwesomeIcon icon={faBars} width={16} height={16}/>
            </button>
            <div className={"dropdown-menu"} aria-labelledby={"settings-dropdown"} style={{width: "300px"}}
                 onClick={e => e.stopPropagation()}>
                <div className={"row mx-0 mb-2"}>
                    <label className={"col-4 col-form-label"}>Font</label>
                    <div className={"col-8"}>
                        <input id={"input-font"} className={"form-control"} type={"text"} disabled={true}
                               defaultValue={settings[FONT]}/>
                    </div>
                </div>
                <div className={"row mx-0 mb-2"}>
                    <label className={"col-4 col-form-label"}>Font size</label>
                    <div className={"col-8"}>
                        <select id={"input-font"} className={"form-select"} defaultValue={settings[FONT_SIZE]}
                                onChange={fontSize}>
                            {[...Array(25).keys()].map(i =>
                                <option key={i + 6} value={i + 6}>{i + 6}</option>
                            )}
                        </select>
                    </div>
                </div>
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
                <div className={"row mx-0 mb-2"}>
                    <label className={"col-4 col-form-label"}>Margins</label>
                    <div className={"col-8"}>
                        <div className={"input-group"}>
                            <input id={"input-margins"} className={"form-control"} type={"number"} disabled={true}
                                   defaultValue={settings[MARGINS]} step={20} min={0}/>
                            <button className={"btn btn-outline-danger"} onClick={e => margins(e, false)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                            <button className={"btn btn-outline-success"} onClick={e => margins(e, true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"row mx-0 mb-2"}>
                    <label className={"col-4 col-form-label"}>Width</label>
                    <div className={"col-8"}>
                        <div className={"input-group"}>
                            <input id={"input-width"} className={"form-control"} type={"number"} disabled={true}
                                   defaultValue={settings[WIDTH]} step={100} min={0}/>
                            <button className={"btn btn-outline-danger"} onClick={e => width(e, false)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                            <button className={"btn btn-outline-success"} onClick={e => width(e, true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"row mx-0 mb-2"}>
                    <div className={"col"}>
                        <div className={"form-check"}>
                            <input id={"input-justify"} className={"form-check-input"} type={"checkbox"}
                                   defaultChecked={settings[JUSTIFY] === "true"} onChange={justify}/>
                            <label className="form-check-label" htmlFor={"input-justify"}>
                                Full Justification
                            </label>
                        </div>
                    </div>
                </div>
                <div className={"row mx-0 mb-2"}>
                    <div className={"col"}>
                        <div className={"form-check"}>
                            <input id={"input-force-font-size"} className={"form-check-input"} type={"checkbox"}
                                   defaultChecked={settings[FORCE_FONT_SIZE] === "true"} onChange={forceFontSize}/>
                            <label className="form-check-label" htmlFor={"input-force-font-size"}>
                                Force font size
                            </label>
                        </div>
                    </div>
                </div>
                <div className={"row mx-0 mb-2"}>
                    <div className={"col"}>
                        <div className="form-check">
                            <input className={"form-check-input"} name="input-layout" type={"radio"} onChange={layout}
                                   defaultChecked={isLayout(LAYOUT_AUTO)} value={LAYOUT_AUTO}
                                   id={"layout-" + LAYOUT_AUTO}/>
                            <label className={"form-check-label"} htmlFor={"layout-" + LAYOUT_AUTO}>
                                Automatic
                            </label>
                        </div>
                        <div className="form-check">
                            <input className={"form-check-input"} name="input-layout" type={"radio"} onChange={layout}
                                   defaultChecked={isLayout(LAYOUT_SINGLE)} value={LAYOUT_SINGLE}
                                   id={"layout-" + LAYOUT_SINGLE}/>
                            <label className={"form-check-label"} htmlFor={"layout-" + LAYOUT_SINGLE}>
                                Single Column
                            </label>
                        </div>
                        <div className="form-check">
                            <input className={"form-check-input"} name="input-layout" type={"radio"} onChange={layout}
                                   defaultChecked={isLayout(LAYOUT_SCROLLED)} value={LAYOUT_SCROLLED}
                                   id={"layout-" + LAYOUT_SCROLLED}/>
                            <label className={"form-check-label"} htmlFor={"layout-" + LAYOUT_SCROLLED}>
                                Scrolled
                            </label>
                        </div>
                        <div className="form-check">
                            <input className={"form-check-input"} name="input-layout" type={"radio"} onChange={layout}
                                   defaultChecked={isLayout(LAYOUT_CONTINUOUS)} value={LAYOUT_CONTINUOUS}
                                   id={"layout-" + LAYOUT_CONTINUOUS}/>
                            <label className={"form-check-label"} htmlFor={"layout-" + LAYOUT_CONTINUOUS}>
                                Continuous
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookSettings;
