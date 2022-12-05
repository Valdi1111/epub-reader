const router = require("express").Router();
const users = require("../services/users");
const response = require("../methods/response");

router.get(
    "/data",
    async (req, res, next) => {
        try {
            const id = req.user_id;
            const results = await users.getData(id);
            if(results.length === 0) {
                response.notFound(res, "user_not_found", "User not found with id " + id);
                return;
            }
            res.json(results[0]);
        } catch (err) {
            console.error("Error on GET /users/data.");
            next(err);
        }
    }
);

module.exports = router;
