const db = require("./db");

async function getUser(email) {
    const [results,] = await db.promise().query(
        `SELECT *
         FROM user u
         WHERE u.email = LOWER(?)`,
        [email]
    );
    return results;
}

async function updateLastLogin(id) {
    const [results,] = await db.promise().query(
        `UPDATE user u
         SET u.last_login=NOW()
         WHERE u.id = ?`,
        [id]
    );
    return results;
}

async function addUser(email, password) {
    const [results,] = await db.promise().query(
        `INSERT INTO user (email, password)
         VALUES (LOWER(?), ?)`,
        [email, password]
    );
    return results;
}

module.exports = {
    getUser,
    updateLastLogin,
    addUser
}
