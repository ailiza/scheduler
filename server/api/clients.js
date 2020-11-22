const router = require("express").Router();
const { Client } = require("../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const clients = await Client.findAll();
		res.json(clients);
	} catch (err) {
		next(err);
	}
});
