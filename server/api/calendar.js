const router = require("express").Router();
const { google } = require("googleapis");
const credentials = require("../../credentials.json");
// const { client_secret, client_id, redirect_uris } = credentials.web;
// const oAuth2Client = new google.auth.OAuth2(
// 	client_id,
// 	client_secret,
// 	redirect_uris[0]
// );
// oAuth2Client.setCredentials(
// 	"4/0AY0e-g5BhldCSbd9ilgHtbsnm9RlCtlIWtl4dI78HIuZKcs20w40zOjJP_Ri_gGGesCuFQ"
// );
// const auth = new google.auth.GoogleAuth({
// 	keyFile: "./credentials.json",
// 	scopes: ["https://www.googleapis.com/auth/cloud-platform"],
// });

// const calendar = google.calendar({ version: "v3", auth: auth });

// router.get("/", async (req, res, next) => {
// 	const events = await calendar.events.list({ calendarId: "tutorCalendar" });
// 	res.send(events);
// });

module.exports = router;
