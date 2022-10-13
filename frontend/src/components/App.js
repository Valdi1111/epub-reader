import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import $ from "jquery";
import {FONT, FONT_SIZE, FORCE_FONT_SIZE, JUSTIFY, LAYOUT, MARGINS, SPACING, THEME, WIDTH} from "./Settings";
import {getThemes} from "./Api";
import Library from "./library/Library";
import BookElement from "./book/BookElement";
import BookRenderer from "./book/BookRenderer";
import ErrorPage from "./ErrorPage";
import {loadToken, setToken} from "./Auth";
import Login from "./Login";

function App() {
    const [settings, setSettings] = useState({});
    const [themes, setThemes] = useState([]);
    const [auth, setAuth] = useState(loadToken());
    useEffect(() => {
        // load themes
        getThemes().then(
            res => setThemes(res.data),
            err => console.error(err)
        );
        // load settings
        const s = {};
        getSettingOrSave(s, FONT, "Serif, sans-serif");
        getSettingOrSave(s, FONT_SIZE, 13);
        getSettingOrSave(s, SPACING, 1.4);
        getSettingOrSave(s, MARGINS, 100);
        getSettingOrSave(s, WIDTH, 1700);
        getSettingOrSave(s, THEME, "dark");
        getSettingOrSave(s, LAYOUT, "auto");
        getSettingOrSave(s, JUSTIFY, true);
        getSettingOrSave(s, FORCE_FONT_SIZE, true);
        setSettings(s);
    }, []);

    useEffect(() => {
        setToken(auth)
    }, [auth]);

    useEffect(() => {
        if (settings[THEME] === undefined) {
            return;
        }
        $("html > body").attr("data-theme", settings[THEME]);
    }, [settings[THEME]]);

    function getSettingOrSave(s, key, def) {
        const value = window.localStorage.getItem(key);
        if (value != null) {
            s[key] = value;
            return;
        }
        window.localStorage.setItem(key, def);
        s[key] = def;
    }

    function setSetting(key, value) {
        window.localStorage.setItem(key, value);
        const s = settings;
        s[key] = value;
        setSettings({...s});
    }

    if (!Object.keys(settings).length || !themes.length) {
        return <></>;
    }

    if (!auth) {
        return <Login setAuth={setAuth}/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index path={"/"} element={<Navigate to="/library/all"/>}/>
                <Route path={"login"} element={<Login setAuth={setAuth}/>}/>
                <Route path={"library/*"} element={
                    <Library settings={settings} setSetting={setSetting} themes={themes}/>
                }/>
                <Route path={"books/:id"} element={
                    <BookElement settings={settings} setSetting={setSetting} themes={themes}>
                        <BookRenderer/>
                    </BookElement>
                }/>
                <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
