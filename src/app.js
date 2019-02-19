const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "dist", "public")));
app.use(express.static(path.join(__dirname, "dist", "public", "css")));
app.use(express.static(path.join(__dirname, "dist", "public", "script")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// app.get("*", (req, res) => {
//   res.redirect("/");
// });

app.listen(3000, () => console.log("Running"));
