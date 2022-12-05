require("dotenv").config();
const path = require("path");
const cors = require("cors");

const apiRoute = require("./routes/api");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(cors())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: false}));

app.use("/api/v1", apiRoute);
app.use("/epub", express.static(process.env.EPUB_FOLDER));
app.use("/themes", express.static(path.join(__dirname, "themes")));
//app.use("/covers", express.static(path.join(__dirname, "covers")));
app.get("/covers/:id", (req, res) => {
    // Using send file to fix auto downloading
    res.contentType("image/jpeg");
    res.sendFile(path.join(__dirname, "covers",req.params.id));
});
app.use("/", express.static(path.join(__dirname, "public")));
app.get((req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
