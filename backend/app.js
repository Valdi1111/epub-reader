require("dotenv").config();
const path = require("path");
const cors = require("cors");

const apiRoute = require("./routes/api");
const express = require("express");
const app = express();

app.use(cors())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: false}));

app.use("/api/v1", apiRoute);
app.use("/epub", express.static(process.env.EPUB_FOLDER));
app.use("/themes", express.static(path.join(__dirname, "themes")));
app.use("/covers", express.static(path.join(__dirname, "covers")));
app.use("/", express.static(path.join(__dirname, "public")));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({ message: err.message });
});

module.exports = app;
