const db = require("./db");

async function getData(user) {
    const [results,] = await db.promise().query(
        `SELECT u.id, u.email, u.created, u.last_login, u.avatar
         FROM user u
         WHERE u.id = ?`,
        [user]
    );
    return results;
}

module.exports = {
    getData
}
