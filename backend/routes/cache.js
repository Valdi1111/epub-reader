const response = require("../methods/response");
const router = require("express").Router({mergeParams: true});
const cache = require("../services/cache");
const books = require("../services/books");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.put(
    "/cover",
    multer({dest: "./covers/"}).single("cover"),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            // remove old cover file if exists
            const results = await books.getCoverById(id);
            if (!(!results.length || !results[0].cover)) {
                const cover = path.join(__dirname, "..", "covers", results[0].cover);
                fs.unlinkSync(cover);
            }
            // add the new one in db
            const image = req.file.filename;
            await cache.cover(id, image);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/cover.");
            next(err);
        }
    }
);

router.delete(
    "/cover",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            // remove old cover file if exists
            const results = await books.getCoverById(id);
            if (!(!results.length || !results[0].cover)) {
                const cover = path.join(__dirname, "..", "covers", results[0].cover);
                fs.unlinkSync(cover);
            }
            // add the new one in db
            await cache.coverNull(id);
            res.send();
        } catch (err) {
            console.error("Error on DELETE /books/:id/cache/cover.");
            next(err);
        }
    }
);

router.put(
    "/navigation",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            console.log(req.body.navigation)
            await cache.navigation(id, JSON.stringify(req.body.navigation));
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/navigation.");
            next(err);
        }
    }
);

router.put(
    "/chapters",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.chapters(id, JSON.stringify(req.body.chapters));
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/chapters.");
            next(err);
        }
    }
);

router.put(
    "/locations",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.locations(id, JSON.stringify(req.body.locations), req.body.total);
            await cache.positionNull(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/locations.");
            next(err);
        }
    }
);

router.put(
    "/position",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.position(id, req.body.position, req.body.page);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/position.");
            next(err);
        }
    }
);

router.put(
    "/mark-read",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.read(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/mark-read.");
            next(err);
        }
    }
);

router.put(
    "/mark-unread",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.unread(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/mark-unread.");
            next(err);
        }
    }
);

module.exports = router;
