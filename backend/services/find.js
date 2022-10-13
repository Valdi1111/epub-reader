const db = require("./db");
const path = require("path");
const fs = require("fs");

async function findNew() {
    const files = searchFiles();
    const [results,] = await db.promise().query(
        `SELECT b.url
         FROM book b
         WHERE b.url IN (?)`,
        [files]
    );
    const present = results.map(item => item.url);
    return files.filter(item => present.indexOf(item) === -1);
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
