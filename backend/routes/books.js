const response = require("../methods/response");
const router = require("express").Router();
const progress = require("../services/progress");
const books = require("../services/books");
const progressRoute = require("./progress");
const cacheRoute = require("./cache");
const path = require("path");
const fs = require("fs");

router.get(
    "/",
    async (req, res, next) => {
        try {
            res.json(await books.getAll());
        } catch (err) {
            console.error("Error on GET /books.");
            next(err);
        }
    }
);

router.get(
    "/not-in-shelf",
    async (req, res, next) => {
        try {
            res.json(await books.getNotInShelf());
        } catch (err) {
            console.error("Error on GET /books/not-in-self.");
            next(err);
        }
    }
);

router.post(
    "/",
    async (req, res, next) => {
        try {
            const results = await books.add(req.body.url, req.body.metadata);
            res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on POST /books.");
            next(err);
        }
    }
);

router.get(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await books.getById(id);
            if(results.length === 0) {
                response.notFound(res, "book_not_found", "Book not found with id " + id);
                return;
            }
            await progress.updateLastRead(id);
            res.json(results[0]);
        } catch (err) {
            console.error("Error on GET /books/:id.");
            next(err);
        }
    }
);

router.get(
    "/:id/metadata",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const results = await books.getMetadataById(id);
            res.json(results[0]);
        } catch (err) {
            console.error("Error on GET /books/:id/metadata.");
            next(err);
        }
    }
);

router.delete(
    "/:id",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            // remove cover file if exists
            const results = await books.getCoverById(id);
            if (!(!results.length || !results[0].cover)) {
                const cover = path.join(__dirname, "..", "covers", results[0].cover);
                fs.unlinkSync(cover);
            }
            // remove book from db
            await books.remove(id);
            res.send();
        } catch (err) {
            console.error("Error on DELETE /books/:id.");
            next(err);
        }
    }
);

router.use("/:id/progress", progressRoute);
router.use("/:id/cache", cacheRoute);

module.exports = router;
