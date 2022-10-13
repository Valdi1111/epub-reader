const response = require("../methods/response");
const router = require("express").Router();
const find = require("../services/find");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const results = await find.findNew();
            res.json(results);
        } catch (err) {
            console.error("Error on GET /find-new.");
            next(err);
        }
    }
);

module.exports = router;
