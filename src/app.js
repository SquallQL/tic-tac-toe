const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.get("*", (req, res) => {
  res.redirect("/");
});

let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
