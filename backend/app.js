require("dotenv").config();
const path = require("path");
const cors = require("cors");

const apiRoute = require("./routes/api");
const express = require("express");
const app = express();

app.use(cors())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: false}));

// Handle api requests
app.use("/api/v1", apiRoute);
// Handle epub file requests
app.use("/epub", express.static(process.env.EPUB_FOLDER));
// Handle cover file requests
app.get("/covers/:id", (req, res) => {
    // Using send file to fix auto downloading
    res.contentType("image/jpeg");
    res.sendFile(path.join(__dirname, "covers",req.params.id));
});
// Handle frontend requests
app.use("/", express.static(path.join(__dirname, "public")));
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
