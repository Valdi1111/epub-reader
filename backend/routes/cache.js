const response = require("../methods/response");
const router = require("express").Router({mergeParams: true});
const progress = require("../services/progress");
const cache = require("../services/cache");
const books = require("../services/books");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

router.put(
    "/cover",
    multer({dest: "./covers/temp"}).single("cover"),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
                response.badRequest(res, "not_image", "File is not an image. mimetype=" + req.file.mimetype);
                return;
            }
            // remove old cover file if exists
            const results = await books.getCoverById(id);
            if (!(!results.length || !results[0].cover)) {
                const cover = path.join(__dirname, "..", "covers", results[0].cover);
                fs.unlinkSync(cover);
            }
            // create compressed file
            const buffer = fs.readFileSync(path.join(__dirname, "..", req.file.path));
            await sharp(buffer)
                .webp({quality: 90})
                .toFile("./covers/" + req.file.filename);
            // delete temp file
            fs.unlinkSync(path.join(__dirname, "..", req.file.path));
            // add the new one in db
            await cache.cover(id, req.file.filename);
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
            await cache.navigation(id, JSON.stringify(req.body.navigation));
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/navigation.");
            next(err);
        }
    }
);

router.put(
    "/locations",
    async (req, res, next) => {
        try {
            const {id} = req.params;
            await cache.locations(id, JSON.stringify(req.body.locations));
            await progress.positionNull(id);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id/cache/locations.");
            next(err);
        }
    }
);

module.exports = router;
