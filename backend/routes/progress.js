const router = require("express").Router({mergeParams: true});
const progress = require("../services/progress");

router.put(
    "/position",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await progress.position(id, req.body.position, req.body.page);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/progress/position.");
            next(err);
        }
    }
);

router.put(
    "/mark-read",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await progress.read(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/progress/mark-read.");
            next(err);
        }
    }
);

router.put(
    "/mark-unread",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await progress.unread(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/progress/mark-unread.");
            next(err);
        }
    }
);

module.exports = router;
