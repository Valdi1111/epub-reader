import {useNavigate, useParams} from "react-router-dom";
import {cloneElement, useEffect, useState} from "react"
//import "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js";
import JSZip from "jszip";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import {Book} from "epubjs";
import $ from "jquery";
import {
    FONT,
    FONT_SIZE,
    FORCE_FONT,
    FORCE_FONT_SIZE,
    JUSTIFY,
    LAYOUT,
    LAYOUTS,
    MARGINS,
    SPACING,
    THEME,
    WIDTH
} from "../Settings";
import {EPUB_URL, THEMES_URL, getBookById, savePosition} from "../Api";

function BookElement(props) {
    const {settings, setSetting, themes} = props;
    const {id} = useParams();
    // book
    const [book, setBook] = useState(null);
    // cache
    const [navigation, setNavigation] = useState([]); // navigation map (id, file, chapter)
    const [chapters, setChapters] = useState({}); // chapters map (file -> chapter)
    const [locations, setLocations] = useState([]); // locations list
    const [mark, setMark] = useState([]); // current position and page
    // data
    const [title, setTitle] = useState("Loading...");
    const [chapter, setChapter] = useState("...");
    const [chapterName, setChapterName] = useState("...");
    const [location, setLocation] = useState("...");
    const [percentage, setPercentage] = useState("...");
    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id).then(
            res => {
                console.log("Loading book with id " + res.data.id);
                const epub = new Book(EPUB_URL + res.data.url);
                setNavigation(res.data.navigation);
                setChapters(res.data.chapters);
                setLocations(res.data.locations);
                setMark([res.data.position, res.data.page]);
                setTitle(res.data.title);
                setBook(epub);
            },
            err => {
                navigate(`/library/all`);
                console.error(err);
            }
        );
    }, [id]);

    useEffect(() => {
        if (mark.length !== 2) {
            return;
        }
        savePosition(id, mark[0], mark[1]).then(res => console.debug("Position updated!"), err => console.error(err));
    }, [mark]);

    useEffect(() => {
        if (!book) {
            return;
        }
        // Generate locations
        book.ready.then(() => {
            console.log("Loading locations...");
            book.locations.load(locations);
            console.log("Locations loaded!");
        });
        $(document).keydown(onKeyDown);
        updateLayout("auto")
    }, [book]);

    function updateLayout() {
        let area = $("#view-root");
        area.empty();
        const layout = settings[LAYOUT];
        const gap = parseFloat(settings[MARGINS]);
        const width = parseFloat(settings[WIDTH]) + gap;
        let rendition = book.renderTo(area[0], {
            ...LAYOUTS[layout],
            width: width + "px",
            height: "100%",
            gap: gap
        });
        if (!(mark.length !== 2 || !mark[0])) {
            rendition.display(mark[0]);
        } else {
            rendition.display();
        }
        rendition.on("relocated", updatePage);
        rendition.on("keydown", onKeyDown);
        rendition.on("click", e => {
            if (e.target.tagName.toLowerCase() === 'img') {
                const modal = new bootstrap.Modal(document.getElementById("image-view-modal"));
                modal.show(e.target);
            }
        });
        // Turn page on mouse wheel
        rendition.hooks.content.register(contents => {
            contents.documentElement.onwheel = e => {
                if (e.deltaY < 0) {
                    onLeft();
                }
                if (e.deltaY > 0) {
                    onRight();
                }
            }
        });
        // Turn page on touch swipe
        rendition.hooks.content.register(contents => {
            let start, end;
            contents.documentElement.ontouchstart = e => {
                start = e.changedTouches[0];
            }
            contents.documentElement.ontouchend = e => {
                end = e.changedTouches[0];
                const elBook = document.querySelector('#view-root');
                if (elBook) {
                    const bound = elBook.getBoundingClientRect();
                    const hr = (end.screenX - start.screenX) / bound.width;
                    const vr = Math.abs((end.screenY - start.screenY) / bound.height);
                    if (hr > 0.1 && vr < 0.1) {
                        onLeft();
                    }
                    if (hr < -0.1 && vr < 0.1) {
                        onRight();
                    }
                }
            }
        });
        // Hide cursor after 3 seconds
        rendition.hooks.content.register(contents => {
            let mouseTimer = null, cursorVisible = true;
            contents.documentElement.onmousemove = e => {
                if (mouseTimer) {
                    window.clearTimeout(mouseTimer);
                }
                if (!cursorVisible) {
                    contents.documentElement.style.cursor = "default";
                    cursorVisible = true;
                }
                mouseTimer = window.setTimeout(() => {
                    mouseTimer = null;
                    contents.documentElement.style.cursor = "none";
                    cursorVisible = false;
                }, 3000);
            }
        });
        updateDefaultTheme();
        themes.forEach(t => rendition.themes.register(t.theme, THEMES_URL + t.css));
        updateTheme();
    }

    function updatePage(loc) {
        const {cfi, href, displayed} = loc.start;
        // update chapter name
        setChapterName(chapters[href]);
        // update chapter
        const currentSpine = book.spine.get(cfi).index;
        const totalSpine = book.spine.last().index;
        setChapter(`${currentSpine + 1} of ${totalSpine + 1}`);
        // update location
        const currentLocation = book.locations.locationFromCfi(cfi);
        const totalLocation = book.locations.length();
        setLocation(`${currentLocation + 1} of ${totalLocation}`);
        // update percentage
        const progress = book.locations.percentageFromCfi(cfi);
        setPercentage(`${Math.round(progress * 100)}%`);
        // update cache position
        setMark([cfi, currentLocation]);
    }

    function updateDefaultTheme() {
        const theme = {};
        theme["font-family"] = settings[FONT] + (settings[FORCE_FONT] === "true" ? " !important" : "");
        theme["font-size"] = settings[FONT_SIZE] + (settings[FORCE_FONT_SIZE] === "true" ? "px !important" : "px");
        theme["line-height"] = settings[SPACING];
        theme["text-align"] = settings[JUSTIFY] === "true" ? "justify" : "left";
        book.rendition.themes.default({"p": theme, "a": theme, "span": theme});
    }

    function updateTheme() {
        book.rendition.themes.select(settings[THEME]);
    }

    function changeSetting(key, value) {
        setSetting(key, value);
        if (key === FONT || key === FONT_SIZE || key === SPACING || key === JUSTIFY
            || key === FORCE_FONT || key === FORCE_FONT_SIZE) {
            updateDefaultTheme();
        }
        if (key === WIDTH) {
            const width = parseFloat(settings[WIDTH]) + parseFloat(settings[MARGINS]);
            book.rendition.resize(width + "px", "100%");
        }
        if (key === LAYOUT || key === MARGINS) {
            updateLayout()
        }
        if (key === THEME) {
            updateTheme();
        }
    }

    function navigateTo(href) {
        book.rendition.display(href);
        console.debug(href)
    }

    function searchSpine(item, value) {
        return item.load(book.load.bind(book))
            .then(item.find.bind(item, value))
            .finally(item.unload.bind(item))
            .then(elems => elems.map(e => {
                    e.chapter = chapters[item.href];
                    return e;
                })
            );
    }

    function search(value, all) {
        if (all) {
            return Promise.all(book.spine.spineItems.map(item => searchSpine(item, value)))
                .then(results => Promise.resolve([].concat.apply([], results)));
        }
        const item = book.spine.get(book.rendition.location.start.cfi);
        return searchSpine(item, value);
    }

    function onKeyDown(e) {
        let code = e.keyCode || e.which;
        if (code === 37) {
            onLeft();
        }
        if (code === 39) {
            onRight();
        }
    }

    function onLeft() {
        //book.package.metadata.direction === "rtl" ? book.rendition.next() : book.rendition.prev();
        book.rendition.prev();
    }

    function onRight() {
        //book.package.metadata.direction === "rtl" ? book.rendition.prev() : book.rendition.next();
        book.rendition.next();
    }

    if (book == null) {
        return <></>;
    }

    return cloneElement(props.children, {
        title: title,
        navigation: navigation,
        navigateTo: navigateTo,
        search: search,
        settings: settings,
        setSetting: changeSetting,
        chapter: chapter,
        chapterName: chapterName,
        location: location,
        percentage: percentage,
        left: onLeft,
        right: onRight
    });

}

export default BookElement;
