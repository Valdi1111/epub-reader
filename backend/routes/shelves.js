const response = require("../methods/response");
const router = require("express").Router();
const shelves = require("../services/shelves");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const results = await shelves.getAll();
            res.json(results);
        } catch (err) {
            console.error("Error on GET /shelves.");
            next(err);
        }
    }
);

router.get(
    "/:id/books",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const [err, results] = await shelves.getBooksInShelf(id);
            if (err) {
                response.notFound(res, "shelf_not_found", "Shelf not found with id " + id);
                return;
            }
            res.json(results);
        } catch (err) {
            console.error("Error on GET /shelves/:id/books.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const {path, name} = req.body;
            await shelves.addShelf(path, name);
            res.send();
        } catch (err) {
            console.error("Error on POST /shelves.");
            next(err);
        }
    }
);

router.put(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {path, name} = req.body;
            await shelves.editShelf(id, path, name);
            res.send();
        } catch (err) {
            console.error("Error on PUT /shelves/:id.");
            next(err);
        }
    }
);

router.delete(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await shelves.removeShelf(id);
            res.send();
        } catch (err) {
            console.error("Error on DELETE /shelves.");
            next(err);
        }
    }
);

module.exports = router;
