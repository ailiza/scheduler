const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Serving silly sounds and rainbows on ${PORT}!`);
});

module.exports = app;
