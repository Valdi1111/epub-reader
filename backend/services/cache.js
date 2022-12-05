const db = require("./db");

async function cover(id, cover) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.cover = ?
         WHERE c.id = ?`,
        [cover, id]
    );
    return results;
}

async function coverNull(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.cover = NULL
         WHERE c.id = ?`,
        [id]
    );
    return results;
}

async function navigation(id, navigation) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.navigation = ?
         WHERE c.id = ?`,
        [navigation, id]
    );
    return results;
}

async function chapters(id, chapters) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.chapters = ?
         WHERE c.id = ?`,
        [chapters, id]
    );
    return results;
}

async function locations(id, locations, total) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.locations = ?,
             c.total     = ?
         WHERE c.id = ?`,
        [locations, total, id]
    );
    return results;
}

async function position(id, position, page) {
    const [results,] = await db.promise().query(
        `UPDATE book_current c
         SET c.position = ?,
             c.page     = ?
         WHERE c.id = ?`,
        [position, page, id]
    );
    return results;
}

async function positionNull(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_current c
         SET c.position = NULL,
             c.page     = 0
         WHERE c.id = ?`,
        [id]
    );
    return results;
}

async function read(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_current c
         SET c.position = NULL,
             c.page     = -1
         WHERE c.id = ?`,
        [id]
    );
    return results;
}

async function unread(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_current c
         SET c.position = NULL,
             c.page     = 0
         WHERE c.id = ?`,
        [id]
    );
    return results;
}

module.exports = {
    cover,
    coverNull,
    navigation,
    chapters,
    locations,
    position,
    positionNull,
    read,
    unread
}
