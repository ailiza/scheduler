const Sequelize = require("sequelize");
const db = require("../db");

const Client = db.define("client", {
	firstName: {
		type: Sequelize.STRING,
		defaultValue: "",
		allowNull: false,
	},
	lastName: {
		type: Sequelize.STRING,
		defaultValue: "",
		allowNull: false,
	},
	displayName: {
		type: Sequelize.STRING,
		get() {
			return `${this.firstName} ${this.lastName}`;
		},
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
});

module.exports = Client;
