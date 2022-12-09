const db = require("./db");

async function position(id, position, page) {
    const [results,] = await db.promise().query(
        `UPDATE book_progress bp
         SET bp.position = ?,
             bp.page     = ?
         WHERE bp.id = ?`,
        [position, page, id]
    );
    return results;
}

async function positionNull(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_progress bp
         SET bp.position = NULL,
             bp.page     = 0
         WHERE bp.id = ?`,
        [id]
    );
    return results;
}

async function read(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_progress bp
         SET bp.position = NULL,
             bp.page     = -1
         WHERE bp.id = ?`,
        [id]
    );
    return results;
}

async function unread(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_progress bp
         SET bp.position = NULL,
             bp.page     = 0
         WHERE bp.id = ?`,
        [id]
    );
    return results;
}

async function updateLastRead(id) {
    const [results,] = await db.promise().query(
        `UPDATE book_progress bp
         SET bp.last_read = NOW()
         WHERE bp.id = ?`,
        [id]
    );
    return results;
}

module.exports = {
    position,
    positionNull,
    read,
    unread,
    updateLastRead
}
