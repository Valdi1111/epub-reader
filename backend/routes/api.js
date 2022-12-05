const router = require("express").Router();
const {protect} = require("../methods/middlewares");

const auth = require("./auth");
const users = require("./users");
const books = require("./books");
const shelves = require("./shelves");
const find = require("./find");

router.use("/auth", auth);
router.use("/users", protect, users);
router.use("/books", protect, books);
router.use("/shelves", protect, shelves);
router.use("/find-new", protect, find);

/* Error handler middleware */
router.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({ message: err.message });
});

module.exports = router;
