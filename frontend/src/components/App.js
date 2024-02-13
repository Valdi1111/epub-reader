import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import $ from "jquery";
import {
    FONT,
    FONT_SIZE,
    SPACING,
    MARGINS,
    WIDTH,
    FORCE_FONT,
    FORCE_FONT_SIZE,
    JUSTIFY,
    LAYOUT,
    THEME,
    FONTS,
    LAYOUTS,
    THEMES
} from "./Settings";
import {getToken, getUserData} from "./Api";
import Library from "./library/Library";
import BookElement from "./book/BookElement";
import BookRenderer from "./book/BookRenderer";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import CheckAuth from "./CheckAuth";

function App() {
    const [settings, setSettings] = useState({});
    const [authData, setAuthData] = useState({loaded: false, data: null});
    const [readySettings, setReadySettings] = useState(false);
    const [readyAuth, setReadyAuth] = useState(false);

    // Load settings
    useEffect(() => {
        const s = {};
        getSettingOrSave(s, FONT, Object.keys(FONTS)[0]);
        getSettingOrSave(s, FONT_SIZE, 19);
        getSettingOrSave(s, FORCE_FONT, true);
        getSettingOrSave(s, FORCE_FONT_SIZE, true);
        getSettingOrSave(s, SPACING, 1.4);
        getSettingOrSave(s, MARGINS, 100);
        getSettingOrSave(s, WIDTH, 1700);
        getSettingOrSave(s, THEME, THEMES[0].theme);
        getSettingOrSave(s, LAYOUT, Object.keys(LAYOUTS)[0]);
        getSettingOrSave(s, JUSTIFY, true);
        setSettings(s);
        setReadySettings(true);
    }, []);

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

    useEffect(() => {
        if (settings[THEME] === undefined) {
            return;
        }
        $("html").attr("data-theme", settings[THEME]);
    }, [settings[THEME]]);

    useEffect(() => {
        if (readyAuth) {
            return;
        }
        if (!getToken()) {
            setAuthData(null);
            setReadyAuth(true);
            return;
        }
        getUserData().then(
            res => {
                setAuthData(res.data);
                setReadyAuth(true);
            },
            err => {
                setAuthData(null);
                setReadyAuth(true);
            }
        );
    }, [readyAuth]);

    function refreshAuth() {
        setAuthData(null);
        setReadyAuth(false);
    }

    // Wait for settings and auth
    if (!readyAuth || !readySettings) {
        return (
            <div className={"vh-100 vw-100 d-flex justify-content-center align-items-center"}>
                <div className={"spinner-border"} role={"status"}>
                    <span className={"visually-hidden"}>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index path={"/"} element={
                    <Navigate to={"/library/all"}/>
                }/>
                <Route path={"login"} element={
                    <Login login={refreshAuth}/>
                }/>
                <Route path={"library/*"} element={
                    <CheckAuth auth={authData}>
                        <Library settings={settings} setSetting={setSetting} logout={refreshAuth}/>
                    </CheckAuth>
                }/>
                <Route path={"books/:id"} element={
                    <CheckAuth auth={authData}>
                        <BookElement settings={settings} setSetting={setSetting}>
                            <BookRenderer/>
                        </BookElement>
                    </CheckAuth>
                }/>
                <Route path={"*"} element={
                    <CheckAuth auth={authData}>
                        <ErrorPage title={"Page not found"} name={"Home"} link={"/"}/>
                    </CheckAuth>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
