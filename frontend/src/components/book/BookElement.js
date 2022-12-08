import {useNavigate, useParams} from "react-router-dom";
import {cloneElement, useEffect, useRef, useState} from "react"
//import "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js";
import JSZip from "jszip";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import {Book, EpubCFI} from "epubjs";
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
    // data
    const [title, setTitle] = useState("Loading...");
    const [mark, setMark] = useState(null); // current position and page
    const [chapter, setChapter] = useState(null); // current chapter
    const [section, setSection] = useState(null); // current section (from spine)
    const [location, setLocation] = useState(null);
    const [percentage, setPercentage] = useState(null);
    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id).then(
            res => {
                console.log("Loading book with id " + res.data.id);
                const epub = new Book(EPUB_URL + res.data.url);
                setNavigation(res.data.navigation);
                setLocations(res.data.locations);
                setMark({position: res.data.position, page: res.data.page});
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
        if (!mark) {
            return;
        }
        savePosition(id, mark.position, mark.page).then(res => console.debug("Position updated!"), err => console.error(err));
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
        if (!mark) {
            rendition.display();
        } else {
            rendition.display(mark.position);
        }
        rendition.on("relocated", updatePage);
        rendition.on("keydown", onKeyDown);
        // Open image view modal when clicking on img or image tag
        rendition.on("click", e => {
            if (e.target.tagName.toLowerCase() === "img" || e.target.tagName.toLowerCase() === "image") {
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
        // Update navigation with cfi based on current section
        rendition.hooks.content.register(contents => {
            updateChapters(contents.documentElement, navigation);
        });
        updateDefaultTheme();
        themes.forEach(t => rendition.themes.register(t.theme, THEMES_URL + t.css));
        updateTheme();
    }

    function updateChapters(doc, chaps) {
        chaps.forEach(c => {
            const section = book.spine.get(c.href);
            let itemCfi = `epubcfi(${section.cfiBase}!/4/1:0)`;
            if (c.href.includes("#")) {
                const dash = c.href.split('#').pop();
                itemCfi = section.cfiFromElement(doc.querySelector("#" + dash));
            }
            c.cfi = itemCfi;
            updateChapters(doc, c.subitems);
        })
    }

    // Possibili funzioni per trovare il chapter tramite la href della current location
    //let getNavItemByHref = href => (function flatten(arr){
    //    return [].concat(...arr.map(v => [v, ...flatten(v.subitems)]));
    //})(book.navigation.toc).filter(
    //    item => book.canonical(item.href) == book.canonical(href)
    //)[0] || null;

    // Possibili funzioni per trovare il chapter tramite la href della current location
    //let getChapter = href => {
    //    let matches = (function flatten(items) {
    //        return [].concat.apply([], items.map(item => [].concat.apply([item], flatten(item.subitems))));
    //    })(book.navigation.toc).filter(item => book.canonical(item.href) == book.canonical(href));
    //    if (matches.length > 1) {
    //        console.log("too many toc matches", event, matches);
    //        return null;
    //    }
    //    return matches[0].label.trim();
    //};

    function flattenNav(items) {
        return [].concat.apply([], items.map(item => [].concat.apply([item], flattenNav(item.subitems))));
    }

    function getChapFromCfi(pos) {
        let prev = null;
        flattenNav(navigation).forEach(s => {
            if (new EpubCFI().compare(pos, s.cfi) === -1) {
                return;
            }
            prev = s;
        })
        return prev;
    }

    function updatePage(loc) {
        const {cfi, href, displayed} = loc.start;
        // update current chapter
        setChapter(getChapFromCfi(loc.end.cfi));
        // update section
        setSection({current: book.spine.get(cfi).index, total: book.spine.last().index});
        // update location
        const page = book.locations.locationFromCfi(cfi);
        setLocation({current: page, total: book.locations.length()});
        // update percentage
        setPercentage(book.locations.percentageFromCfi(cfi));
        // update cache position
        setMark({position: cfi, page: page});
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
        section: section,
        location: location,
        percentage: percentage,
        left: onLeft,
        right: onRight
    });

}

export default BookElement;
