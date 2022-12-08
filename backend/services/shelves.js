const db = require("./db");

async function getAll() {
    const [results,] = await db.promise().query(
        `SELECT s.id,
                s.path,
                s.name,
                (SELECT COUNT(*) AS books FROM book b WHERE b.url LIKE CONCAT(s.path, ?)) AS books
         FROM shelf s
         ORDER BY s.name`,
        [`/%`]
    );
    return results;
}

async function getBooksInShelf(id) {
    const [results1,] = await db.promise().query(
        `SELECT *
         FROM shelf s
         WHERE s.id = ?`,
        [id]
    );
    if (results1.length === 0) {
        return [true, null];
    }
    const [results2,] = await db.promise().query(
        `SELECT b.id,
                b.url,
                bm.title,
                bm.creator,
                bc.cover,
                br.page,
                JSON_LENGTH(bc.locations) AS total
         FROM book b
                  INNER JOIN book_cache bc on b.id = bc.id
                  INNER JOIN book_metadata bm on b.id = bm.id
                  INNER JOIN book_current br ON b.id = br.id
         WHERE b.url LIKE ?
         ORDER BY b.url`,
        [`${results1[0].path}/%`]
    );
    return [false, results2];
}

async function addShelf(path, name) {
    const [results,] = await db.promise().query(
        `INSERT INTO shelf(path, name)
         VALUES (?, ?)`,
        [path, name]
    );
    return results;
}

async function editShelf(id, path, name) {
    const [results,] = await db.promise().query(
        `UPDATE shelf s
         SET s.path = ?,
             s.name = ?
         WHERE s.id = ?`,
        [path, name, id]
    );
    return results;
}

async function removeShelf(id) {
    const [results,] = await db.promise().query(
        `DELETE
         FROM shelf s
         WHERE s.id = ?`,
        [id]
    );
    return results;
}

module.exports = {
    getAll,
    getBooksInShelf,
    addShelf,
    editShelf,
    removeShelf
}
