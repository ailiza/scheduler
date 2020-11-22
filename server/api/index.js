const router = require("express").Router();
module.exports = router;

router.use("/calendar", require("./calendar"));
router.use("/clients", require("./clients"));
router.use("/stripe", require("./stripe"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
