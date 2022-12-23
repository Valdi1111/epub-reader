const response = require("../methods/response");
const router = require("express").Router();
const books = require("../services/books");
const progress = require("../services/progress");
const progressRoute = require("./progress");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

router.get(
    "/",
    async (req, res, next) => {
        try {
            const limit = Number(req.query.limit);
            const offset = Number(req.query.offset);
            res.json(await books.getAll(limit, offset));
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
            const limit = Number(req.query.limit);
            const offset = Number(req.query.offset);
            res.json(await books.getNotInShelf(limit, offset));
        } catch (err) {
            console.error("Error on GET /books/not-in-self.");
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

router.post(
    "/",
    multer({dest: "./covers/temp"}).single("cover"),
    async (req, res, next) => {
        const {url, metadata, locations, navigation} = req.body;
        try {
            if(!(!req.file)) {
                if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
                    response.badRequest(res, "not_image", "File is not an image. mimetype=" + req.file.mimetype);
                    return;
                }
                // create cover file
                await saveCoverFile(req.file.path, req.file.filename);
            }
            const cover = !req.file ? null : req.file.filename;
            const results = await books.add(url, JSON.parse(metadata), cover, locations, navigation);
            res.json({id: results.insertId});
        } catch (err) {
            console.error("Error on POST /books.");
            next(err);
        }
    }
);

router.put(
    "/:id",
    multer({dest: "./covers/temp"}).single("cover"),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {locations, navigation} = req.body;
            // Cover
            if(!req.file) {
                // remove old cover file if exists
                await removeCoverFile(id);
                // add the new one in db
                await books.setCoverNull(id);
            }
            else {
                if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
                    response.badRequest(res, "not_image", "File is not an image. mimetype=" + req.file.mimetype);
                    return;
                }
                // remove old cover file if exists
                await removeCoverFile(id);
                // create cover file
                await saveCoverFile(req.file.path, req.file.filename);
                // add the new one in db
                await books.setCover(id, req.file.filename);
            }
            // Locations
            await books.setLocations(id, locations);
            await progress.positionNull(id);
            // Navigation
            await books.setNavigation(id, navigation);
            res.send();
        } catch (err) {
            console.error("Error on PUT /books/:id.");
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
            await removeCoverFile(id);
            // remove book from db
            await books.remove(id);
            res.send();
        } catch (err) {
            console.error("Error on DELETE /books/:id.");
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

async function removeCoverFile(id) {
    const results = await books.getCoverById(id);
    if (!(!results.length || !results[0].cover)) {
        const cover = path.join(__dirname, "..", "covers", results[0].cover);
        fs.unlinkSync(cover);
    }
}

async function saveCoverFile(loc, filename) {
    // create compressed file
    const buffer = fs.readFileSync(path.join(__dirname, "..", loc));
    await sharp(buffer)
        .webp({quality: 90})
        .toFile("./covers/" + filename);
    // delete temp file
    fs.unlinkSync(path.join(__dirname, "..", loc));
}

router.use("/:id/progress", progressRoute);

module.exports = router;
