const db = require("./db");

async function getAll(limit, offset) {
    const [results,] = await db.promise().query(
        `SELECT b.id,
                b.url,
                bm.title,
                bm.creator,
                bc.cover,
                bp.page,
                JSON_LENGTH(bc.locations)                                     AS total,
                (SELECT s.id FROM shelf s WHERE b.url LIKE CONCAT(s.path, ?)) AS shelf
         FROM book b
                  INNER JOIN book_cache bc
                             ON b.id = bc.id
                  INNER JOIN book_metadata bm ON b.id = bm.id
                  INNER JOIN book_progress bp ON b.id = bp.id
         ORDER BY bp.last_read DESC LIMIT ${offset}, ${limit}`,
        [`/%`]
    );
    return results;
}

async function getNotInShelf(limit, offset) {
    const [results1,] = await db.promise().query(
        `SELECT s.path
         FROM shelf s`,
        []
    );
    const paths = results1.map(e => `^${e.path}/(.*)`);
    const exp = paths.join("|");
    if (!exp) {
        const [results2,] = await db.promise().query(
            `SELECT b.id,
                    b.url,
                    bm.title,
                    bm.creator,
                    bc.cover,
                    bp.page,
                    JSON_LENGTH(bc.locations) AS total
             FROM book b
                      INNER JOIN book_cache bc ON b.id = bc.id
                      INNER JOIN book_metadata bm ON b.id = bm.id
                      INNER JOIN book_progress bp ON b.id = bp.id
             ORDER BY bm.title LIMIT ${offset}, ${limit}`,
            []
        );
        return results2;
    }
    const [results2,] = await db.promise().query(
        `SELECT b.id,
                b.url,
                bm.title,
                bm.creator,
                bc.cover,
                bp.page,
                JSON_LENGTH(bc.locations) AS total
         FROM book b
                  INNER JOIN book_cache bc ON b.id = bc.id
                  INNER JOIN book_metadata bm ON b.id = bm.id
                  INNER JOIN book_progress bp ON b.id = bp.id
         WHERE b.url NOT REGEXP ?
         ORDER BY bm.title LIMIT ${offset}, ${limit}`,
        [exp]
    );
    return results2;
}

async function getById(id) {
    const [results,] = await db.promise().query(
        `SELECT b.id,
                b.url,
                bm.title,
                bc.cover,
                bc.navigation,
                bc.locations,
                bp.position,
                bp.page
         FROM book b
                  INNER JOIN book_cache bc ON b.id = bc.id
                  INNER JOIN book_metadata bm on b.id = bm.id
                  INNER JOIN book_progress bp on b.id = bp.id
         WHERE b.id = ?`,
        [id]
    );
    return results;
}

async function add(url, m, cover, locations, navigation) {
    const [results,] = await db.promise().query(
        `INSERT INTO book (url)
         VALUES (?)`,
        [url]
    );
    const id = results.insertId;
    await db.promise().query(
        `INSERT INTO book_metadata (id, identifier, title, creator, pubdate, publisher, language, rights, modified_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, m.identifier, m.title, m.creator, m.pubdate, m.publisher, m.language, m.rights, m.modified_date]
    );
    await db.promise().query(
        `INSERT INTO book_progress (id)
         VALUES (?)`,
        [id]
    );
    await db.promise().query(
        `INSERT INTO book_cache (id, cover, navigation, locations)
         VALUES (?, ?, ?, ?)`,
        [id, cover, navigation, locations]
    );
    return results;
}

async function remove(id) {
    const [results_bc,] = await db.promise().query(
        `DELETE
         FROM book_cache bc
         WHERE bc.id = ?`,
        [id]
    );
    const [results_bp,] = await db.promise().query(
        `DELETE
         FROM book_progress bp
         WHERE bp.id = ?`,
        [id]
    );
    const [results_bm,] = await db.promise().query(
        `DELETE
         FROM book_metadata bm
         WHERE bm.id = ?`,
        [id]
    );
    const [results_b,] = await db.promise().query(
        `DELETE
         FROM book b
         WHERE b.id = ?`,
        [id]
    );
    return [results_bc, results_bm, results_b];
}

async function getMetadataById(id) {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM book_metadata bm
         WHERE bm.id = ?`,
        [id]
    );
    return results;
}

async function getCoverById(id) {
    const [results,] = await db.promise().query(
        `SELECT bc.cover
         FROM book_cache bc
         WHERE id = ?`,
        [id]
    );
    return results;
}

async function setCover(id, cover) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.cover = ?
         WHERE c.id = ?`,
        [cover, id]
    );
    return results;
}

async function setCoverNull(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.cover = NULL
         WHERE c.id = ?`,
        [id]
    );
    return results;
}

async function setLocations(id, locations) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.locations = ?
         WHERE c.id = ?`,
        [locations, id]
    );
    return results;
}

async function setNavigation(id, navigation) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.navigation = ?
         WHERE c.id = ?`,
        [navigation, id]
    );
    return results;
}

module.exports = {
    getAll,
    getNotInShelf,
    getById,
    add,
    remove,
    getMetadataById,
    getCoverById,
    setCover,
    setCoverNull,
    setLocations,
    setNavigation
}
