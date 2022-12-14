// Settings keys
export const FONT = "font";
export const FORCE_FONT = "force-font";
export const SPACING = "spacing";
export const MARGINS = "margins";
export const WIDTH = "width";
export const FONT_SIZE = "font-size";
export const FORCE_FONT_SIZE = "force-font-size";
export const JUSTIFY = "justify";
export const LAYOUT = "layout";
export const THEME = "theme";

export const FONTS = {
    serif: "Serif",
    sans_serif: "Sans-serif",
    calibri: "Calibri",
    monospace: "Monospace",
    system_ui: "System-ui"
};

export const FONT_SIZES = range(6, 30);
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const LAYOUTS = {
    auto: {name: "Automatic", settings: {flow: "paginated", maxSpreadColumns: 2}},
    single: {name: "Single Column", settings: {flow: "paginated", spread: "none"}},
    scrolled: {name: "Scrolled", settings: {flow: "scrolled-doc"}},
    continuous: {name: "Continuous", settings: {flow: "scrolled", manager: "continuous"}}
}

export function isWheelActive(settings) {
    return settings[LAYOUT] === "auto" || settings[LAYOUT] === "single"
}

export const THEMES = [
    {
        theme: "light",
        name: "Light",
        css: {
            body: {
                background: "#fff",
                color: "#000"
            },
            "a:link": {
                color: "blue"
            }
        }
    },
    {
        theme: "sepia",
        name: "Sepia",
        css: {
            body: {
                background: "#efe7dd",
                color: "#5b4636"
            },
            "a:link": {
                color: "darkcyan"
            }
        }
    },
    {
        theme: "dark",
        name: "Dark",
        css: {
            body: {
                background: "#292929",
                color: "#dedede"
            },
            "a:link": {
                color: "cornflowerblue"
            }
        }
    },
    {
        theme: "nord",
        name: "Nord",
        css: {
            body: {
                background: "#2e3440",
                color: "#d8dee9"
            },
            "a:link": {
                color: "#88c0d0"
            }
        }
    }
]
