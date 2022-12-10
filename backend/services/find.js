const db = require("./db");
const path = require("path");
const fs = require("fs");

async function findNew() {
    // get all files from disk
    const files = searchFiles();
    // get all books in database
    const [results,] = await db.promise().query(
        `SELECT b.url
         FROM book b
         WHERE b.url IN (?)`,
        [files]
    );
    // filter books not in database
    const present = results.map(item => item.url);
    const filtered = files.filter(item => present.indexOf(item) === -1);
    // regroup based on folder
    let res = {"/": []};
    filtered.forEach(b => {
        const path = b.split("/", 2);
        const folder = path.length === 1 ? "/" : path[0];
        const file = path.length === 1 ? b : b.replace(`${folder}/`, "");
        if(!res[folder]) {
            res[folder] = [{path: b, file}];
        } else {
            res[folder] = [...res[folder], {path: b, file}];
        }
    });
    return res;
}

function searchFiles(p = '', all = []) {
    const fp = path.join(process.env.EPUB_FOLDER, p);
    if (fs.statSync(fp).isDirectory()) {
        fs.readdirSync(fp).map(f => searchFiles(path.join(p, f), all));
    } else if (p.split('.').pop() === 'epub') {
        //const str = p.replaceAll("\\", "/");
        all.push(p);
    }
    return all;
}

module.exports = {
    findNew
}
