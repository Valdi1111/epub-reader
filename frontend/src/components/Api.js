import {Book} from "epubjs";
import axios from "axios";

//export const URL = "http://192.168.1.170:12135/"
export const URL = "/";
export const API_URL = URL + "api/v1/";
export const THEMES_URL = URL + "themes/";
export const COVERS_URL = URL + "covers/";
export const EPUB_URL = URL + "epub/";

const locale = "en-US";
const opts = {style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 0};
const formatter = new Intl.NumberFormat(locale, opts);

export function formatReadPercent(page, total) {
    return formatter.format(page / total);
}

export function getToken() {
    return window.localStorage.getItem("token");
}

export async function login(email, password) {
    return axios.post(
        `${API_URL}auth/login`,
        {email, password}
    );
}

export async function getUserData() {
    return axios.get(
        `${API_URL}users/data`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getThemes() {
    return await axios.get(`${THEMES_URL}themes.json`);
}

export async function getShelves() {
    return await axios.get(
        `${API_URL}shelves`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getBooksInShelf(id) {
    return await axios.get(
        `${API_URL}shelves/${id}/books`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function addShelf(path, name) {
    return await axios.post(
        `${API_URL}shelves`, {path, name},
        {headers: {"x-access-token": getToken()}}
    );
}

export async function editShelf(id, path, name) {
    return await axios.put(
        `${API_URL}shelves/${id}`, {path, name},
        {headers: {"x-access-token": getToken()}}
    );
}

export async function deleteShelf(id) {
    return await axios.delete(
        `${API_URL}shelves/${id}`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function findNew() {
    return await axios.get(
        `${API_URL}find-new`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getBooks() {
    return await axios.get(
        `${API_URL}books`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getBookById(id) {
    return await axios.get(
        `${API_URL}books/${id}`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getBookMetadata(id) {
    return await axios.get(
        `${API_URL}books/${id}/metadata`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function getNotInShelf() {
    return await axios.get(
        `${API_URL}books/not-in-shelf`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function deleteBook(id) {
    return await axios.delete(
        `${API_URL}books/${id}`,
        {headers: {"x-access-token": getToken()}}
    );
}

export async function markRead(id) {
    return await axios.put(
        `${API_URL}books/${id}/progress/mark-read`, {},
        {headers: {"x-access-token": getToken()}}
    );
}

export async function markUnread(id) {
    return await axios.put(
        `${API_URL}books/${id}/progress/mark-unread`, {},
        {headers: {"x-access-token": getToken()}}
    );
}

export async function createBook(url) {
    console.log("Creating book from link...");
    const epub = new Book(EPUB_URL + url);
    const book = await epub.opened;
    const res = await axios.post(
        `${API_URL}books`,
        {url, metadata: book.packaging.metadata},
        {headers: {"x-access-token": getToken()}}
    );
    const id = res.data.id;
    await saveCover(id, book);
    await saveLocations(id, book);
    await saveNavigation(id, book);
    return id;
}

export async function invalidateCache(url, id) {
    console.log("Book", id, "Recreating cache...");
    const epub = new Book(EPUB_URL + url);
    const book = await epub.opened;
    await saveCover(id, book);
    await saveLocations(id, book);
    await saveNavigation(id, book);
    return id;
}

async function saveCover(id, book) {
    console.debug("Book", id, "Generating cover...");
    const cover = await book.coverUrl();
    if(!cover) {
        await axios.delete(
            `${API_URL}books/${id}/cache/cover`,
            {headers: {"x-access-token": getToken()}}
        );
        console.log("Book", id, "Cover not found! Skipping cover caching...");
        return;
    }
    const res = await fetch(cover);
    const blob = await res.blob();
    const data = new FormData();
    data.append("cover", blob, "cover.png");
    console.debug("Book", id, "Saving cover...");
    await axios.put(
        `${API_URL}books/${id}/cache/cover`,
        data,
        {headers: {"x-access-token": getToken(), "content-type": "multipart/form-data"}}
    );
    console.debug("Book", id, "Cover saved!");
}

async function saveLocations(id, book) {
    console.debug("Book", id, "Generating locations...");
    const locations = await book.locations.generate(1024);
    console.debug("Book", id, "Saving locations...");
    await axios.put(
        `${API_URL}books/${id}/cache/locations`,
        {locations},
        {headers: {"x-access-token": getToken()}}
    );
    console.debug("Book", id, "Locations saved!");
}

async function saveNavigation(id, book) {
    console.debug("Book", id, "Generating navigation...");
    await loadAllSpines(book);
    const navigation = generateNavigation(book, book.navigation);
    console.debug("Book", id, "Saving navigation...");
    await axios.put(
        `${API_URL}books/${id}/cache/navigation`,
        {navigation},
        {headers: {"x-access-token": getToken()}}
    );
    console.debug("Book", id, "Navigation saved!");
}

export function savePosition(id, position, page) {
    return axios.put(
        `${API_URL}books/${id}/progress/position`,
        {position, page},
        {headers: {"x-access-token": getToken()}}
    );
}

async function loadAllSpines(book) {
    let spines = [];
    book.spine.each(s => {
        spines = [...spines, s];
    });
    await Promise.all(spines.map(async section => {
        await section.load(book.load.bind(book));
    }))
}

function generateNavigation(book, items) {
    let navigation = [];
    items.forEach(item => {
        let nav = {};
        nav.id = item.id;
        nav.label = item.label.replace("\n", "").trim();
        // check for ids in href
        let dash = "";
        if(item.href.includes("#")) {
            dash = "#" + item.href.split('#').pop();
        }
        // handle items with null href (section for chapters)
        if(!item.href) {
            nav.href = null;
        }
        // get href from spine
        else if(book.spine.get(item.href) !== null) {
            nav.href = book.spine.get(item.href).href + dash;
            //console.log("Using first method", nav["href"])
        }
        // try rebuilding the href and get from spine
        else {
            nav.href = book.spine.get("Text/" + item.href.split('/').pop()).href + dash;
            //console.log("Using second method", nav["href"])
        }
        // ignoring cfi for section
        if(!nav.href) {
            nav.cfi = null;
        }
        // get chapter cfi from spine
        else {
            const section = book.spine.get(nav.href);
            if (!dash) {
                nav.cfi = `epubcfi(${section.cfiBase}!/4/1:0)`;
            } else {
                nav.cfi = section.cfiFromElement(section.document.documentElement.querySelector(`[id='${dash}']`));
            }
        }
        // handle sub items
        nav.subitems = generateNavigation(book, item.subitems);
        navigation = [...navigation, nav];
    });
    return navigation;
}
