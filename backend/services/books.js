const db = require("./db");

async function getAll() {
    const [results,] = await db.promise().query(
        `SELECT b.id,
                b.url,
                bm.title,
                bm.creator,
                bc.cover,
                br.page,
                bc.total,
                br.read,
                (SELECT s.id FROM shelf s WHERE b.url LIKE CONCAT(s.path, ?)) AS shelf
         FROM book b
                  INNER JOIN book_cache bc
                             ON b.id = bc.id
                  INNER JOIN book_metadata bm ON b.id = bm.id
                  INNER JOIN book_current br ON b.id = br.id
         ORDER BY b.last_read DESC`,
        [`/%`]
    );
    return results;
}

async function getNotInShelf() {
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
                    br.page,
                    bc.total,
                    br.read
             FROM book b
                      INNER JOIN book_cache bc ON b.id = bc.id
                      INNER JOIN book_metadata bm ON b.id = bm.id
                      INNER JOIN book_current br ON b.id = br.id
             ORDER BY bm.title`,
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
                br.page,
                bc.total,
                br.read
         FROM book b
                  INNER JOIN book_cache bc ON b.id = bc.id
                  INNER JOIN book_metadata bm ON b.id = bm.id
                  INNER JOIN book_current br ON b.id = br.id
         WHERE b.url NOT REGEXP ?
         ORDER BY bm.title`,
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
                bc.chapters,
                bc.locations,
                br.position,
                br.page
         FROM book b
                  INNER JOIN book_cache bc ON b.id = bc.id
                  INNER JOIN book_metadata bm on b.id = bm.id
                  INNER JOIN book_current br on b.id = br.id
         WHERE b.id = ?`,
        [id]
    );
    return results;
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

async function add(url, m) {
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
        `INSERT INTO book_current (id)
         VALUES (?)`,
        [id]
    );
    await db.promise().query(
        `INSERT INTO book_cache (id)
         VALUES (?)`,
        [id]
    );
    return results;
}

async function updateLastRead(id) {
    const [results,] = await db.promise().query(
        `UPDATE book b
         SET b.last_read = NOW()
         WHERE b.id = ?`,
        [id]
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
    const [results_br,] = await db.promise().query(
        `DELETE
         FROM book_current br
         WHERE br.id = ?`,
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

module.exports = {
    getAll,
    getNotInShelf,
    getById,
    getMetadataById,
    getCoverById,
    add,
    updateLastRead,
    remove
}
