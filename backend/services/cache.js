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

async function locations(id, locations) {
    const [results,] = await db.promise().query(
        `UPDATE book_cache c
         SET c.locations = ?
         WHERE c.id = ?`,
        [locations, id]
    );
    return results;
}

module.exports = {
    cover,
    coverNull,
    navigation,
    locations
}
