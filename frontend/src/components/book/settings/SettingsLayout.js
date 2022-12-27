import {LAYOUT, LAYOUTS} from "../../Settings";

function SettingsLayout(props) {
    const {settings, setSetting} = props;

    function layout(e) {
        setSetting(LAYOUT, e.target.value);
    }

    function isLayout(layout) {
        return settings[LAYOUT] === layout;
    }

    function Layout(props) {
        const {id, name} = props;
        return (
            <div className="form-check">
                <input className={"form-check-input"} name="input-layout" type={"radio"} onChange={layout}
                       defaultChecked={isLayout(id)} value={id}
                       id={"layout-" + id}/>
                <label className={"form-check-label"} htmlFor={"layout-" + id}>{name}</label>
            </div>
        );
    }

    function getLayouts() {
        let e = [];
        for (let id in LAYOUTS) {
            e = [...e, <Layout key={id} id={id} name={LAYOUTS[id].name}/>];
        }
        return e;
    }

    return (
        <div className={"row mx-0 mb-2"}>
            <div className={"col"}>
                {getLayouts()}
            </div>
        </div>
    );

}

export default SettingsLayout;
