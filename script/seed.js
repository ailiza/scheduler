const faker = require("faker");
const db = require("../server/db");
const { Client } = require("../server/db/models");

const clientsArray = [];

async function seed() {
	await db.sync({ force: true });
	console.log("db synced!");

	for (let i = 0; i < 10; i++) {
		clientsArray.push({
			firstName: `${faker.name.firstName()}`,
			lastName: `${faker.name.lastName()}`,
			email: `${faker.internet.email()}`,
		});
	}
	const clients = await Promise.all(
		clientsArray.map((client) => {
			return Client.create(client);
		})
	);

	console.log(`seeded ${clientsArray.length} clients`);
}

seed();
