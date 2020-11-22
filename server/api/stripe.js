const router = require("express").Router();
require("../../secrets");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET, {
	apiVersion: "2020-08-27",
});

module.exports = router;

router.get("/checkout", (req, res, next) => {
	res.redirect("/");
});

const calculateOrderAmount = (order) => {
	return 1400;
};

// const calculateOrderAmount = (order: Order): number => {
//   // Replace this constant with a calculation of the order's amount.
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client.
//   return 1400;
// };

router.post("/create-payment-intent", async (req, res, next) => {
	const { items, currency } = req.body;
	const params = (Stripe.PaymentIntentCreateParams = {
		amount: calculateOrderAmount(items),
		currency,
	});
	const paymentIntent = (Stripe.paymentIntent = await stripe.paymentIntents.create(
		params
	));
	res.send({
		clientSecret: paymentIntent.client_secret,
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

// app.post(
//   "/create-payment-intent",
//   async (req: express.Request, res: express.Response): Promise<void> => {
//     const { items, currency }: { items: Order; currency: string } = req.body;
//     // Create a PaymentIntent with the order amount and currency.
//     const params: Stripe.PaymentIntentCreateParams = {
//       amount: calculateOrderAmount(items),
//       currency
//     };

//     const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
//       params
//     );

//     // Send publishable key and PaymentIntent client_secret to client.
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//       publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
//     });
//   }
// );

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks
// app.post(
//   "/webhook",
//   // Use body-parser to retrieve the raw body as a buffer.
//   bodyParser.raw({ type: "application/json" }),
//   async (req: express.Request, res: express.Response): Promise<void> => {
//     // Retrieve the event by verifying the signature using the raw body and secret.
//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         req.headers["stripe-signature"],
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`);
//       res.sendStatus(400);
//       return;
//     }

//     // Extract the data from the event.
//     const data: Stripe.Event.Data = event.data;
//     const eventType: string = event.type;

//     if (eventType === "payment_intent.succeeded") {
//       // Cast the event into a PaymentIntent to make use of the types.
//       const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
//       // Funds have been captured
//       // Fulfill any orders, e-mail receipts, etc
//       // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
//       console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
//       console.log("💰 Payment captured!");
//     } else if (eventType === "payment_intent.payment_failed") {
//       // Cast the event into a PaymentIntent to make use of the types.
//       const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
//       console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
//       console.log("❌ Payment failed.");
//     }
//     res.sendStatus(200);
//   }
// );

// app.listen(4242, (): void =>
//   console.log(`Node server listening on port ${4242}!`)
// );
