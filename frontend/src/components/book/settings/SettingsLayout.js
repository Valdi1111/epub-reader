import {LAYOUT, LAYOUT_AUTO, LAYOUT_CONTINUOUS, LAYOUT_SCROLLED, LAYOUT_SINGLE} from "../../Settings";

function SettingsLayout(props) {
    const {settings, setSetting} = props;

    function layout(e) {
        setSetting(LAYOUT, e.target.value);
    }

    function isLayout(layout) {
        return settings[LAYOUT] === layout;
    }

    return (
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
    );

}

export default SettingsLayout;
