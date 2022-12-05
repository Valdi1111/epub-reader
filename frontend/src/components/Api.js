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
    await saveChapters(id, book);
    return id;
}

export async function invalidateCache(url, id) {
    console.log("Book", id, "Recreating cache...");
    const epub = new Book(EPUB_URL + url);
    const book = await epub.opened;
    await saveCover(id, book);
    await saveLocations(id, book);
    await saveNavigation(id, book);
    await saveChapters(id, book);
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
    await book.locations.generate(1024);
    console.debug("Book", id, "Saving locations...");
    await axios.put(
        `${API_URL}books/${id}/cache/locations`,
        {locations: book.locations.save(), total: book.locations.length()},
        {headers: {"x-access-token": getToken()}}
    );
    console.debug("Book", id, "Locations saved!");
}

async function saveNavigation(id, book) {
    console.debug("Book", id, "Generating navigation...");
    let navigation = generateNavigation(book);
    console.debug("Book", id, "Saving navigation...");
    await axios.put(
        `${API_URL}books/${id}/cache/navigation`,
        {navigation},
        {headers: {"x-access-token": getToken()}}
    );
    console.debug("Book", id, "Navigation saved!");
}

async function saveChapters(id, book) {
    console.debug("Book", id, "Generating chapters...");
    let chapters = generateChapters(book);
    console.debug("Book", id, "Saving chapters...");
    await axios.put(
        `${API_URL}books/${id}/cache/chapters`,
        {chapters},
        {headers: {"x-access-token": getToken()}}
    );
    console.debug("Book", id, "Chapters saved!");
}

export function savePosition(id, position, page) {
    return axios.put(
        `${API_URL}books/${id}/cache/position`,
        {position, page},
        {headers: {"x-access-token": getToken()}}
    );
}

function generateNavigation(book) {
    // TODO da rimuovere se funziona il nuovo metodo di subchapters
    /*let navigation = [];
    book.navigation.forEach(item => {
        let nav = {};
        nav["id"] = item.id;
        nav["label"] = item.label;
        let dash = "";
        if(item.href.includes("#")) {
            dash = "#" + item.href.split('#').pop();
        }
        if(item.href === null || item.href === "") {
            nav["href"] = null;
        } else if(book.spine.get(item.href) !== null) {
            nav["href"] = book.spine.get(item.href).href + dash;
            //console.log("Using first method", nav["href"])
        } else {
            nav["href"] = book.spine.get("Text/" + item.href.split('/').pop()).href + dash;
            //console.log("Using second method", nav["href"])
        }
        console.log(item.id, item.label, item.href, item.subitems, item.subitems.length)
        if(item.subitems.length > 0) {

        }
        // TODO handle sub items
        navigation = [...navigation, nav];
    });
    //console.log(book.spine)
    return navigation;*/
    return handleNavigationItems(book, book.navigation);
}

function handleNavigationItems(book, items) {
    let navigation = [];
    items.forEach(item => {
        let nav = {};
        nav["id"] = item.id;
        nav["label"] = item.label;
        let dash = "";
        if(item.href.includes("#")) {
            dash = "#" + item.href.split('#').pop();
        }
        if(item.href === null || item.href === "") {
            nav["href"] = null;
        } else if(book.spine.get(item.href) !== null) {
            nav["href"] = book.spine.get(item.href).href + dash;
            //console.log("Using first method", nav["href"])
        } else {
            nav["href"] = book.spine.get("Text/" + item.href.split('/').pop()).href + dash;
            //console.log("Using second method", nav["href"])
        }
        nav.subitems = handleNavigationItems(book, item.subitems);
        navigation = [...navigation, nav];
    });
    return navigation;
}

function generateChapters(book) {
    let chapters = {};
    let nav = "";
    book.spine.items.forEach(spine => {
        let s = spine.href.split('/').pop();
        // TODO da rimuovere se funziona il nuovo metodo di subchapters
        /*let item = null;
        book.navigation.forEach(nav => {
            if (nav.href.includes(s)) {
                item = nav;
            }
        });*/
        let item = findChapter(book.navigation, s);
        if (item != null) {
            nav = item.label;
        }
        chapters[spine.href] = nav;
    });
    return chapters;
}

function findChapter(items, s) {
    let item = null;
    items.forEach(nav => {
        if (nav.href.includes(s)) {
            item = nav;
        }
        let chap = findChapter(nav.subitems, s);
        if(chap != null) {
            item = chap;
        }
    });
    return item;
}
