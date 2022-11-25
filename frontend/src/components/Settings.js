export const FONT = "font";
export const FONT_SIZE = "font-size";
export const FORCE_FONT = "force-font";
export const FORCE_FONT_SIZE = "force-font-size";
export const FONTS = [
    "Calibri",
    "Monospace",
    "Sans-serif",
    "Serif",
    "System-ui"
];

export const SPACING = "spacing";
export const MARGINS = "margins";
export const WIDTH = "width";
export const THEME = "theme";
export const JUSTIFY = "justify";

export const LAYOUT = "layout";
export const LAYOUT_AUTO = "auto";
export const LAYOUT_SINGLE = "single";
export const LAYOUT_SCROLLED = "scrolled";
export const LAYOUT_CONTINUOUS = "continuous";
export const LAYOUTS = {
    "auto": {flow: "paginated", maxSpreadColumns: 2},
    "single": {flow: "paginated", spread: "none"},
    "scrolled": {flow: "scrolled-doc"},
    "continuous": {flow: "scrolled", manager: "continuous"}
}
