const router = require("express").Router();
const {protect} = require("../methods/middlewares");

const auth = require("./auth");
const books = require("./books");
const shelves = require("./shelves");
const find = require("./find");

router.use("/auth", auth);
router.use("/books", protect, books);
router.use("/shelves", protect, shelves);
router.use("/find-new", protect, find);

module.exports = router;
