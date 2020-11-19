const router = require("express").Router();

router.use("/calendar", require("./calendar"));

module.exports = router;
