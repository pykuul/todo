require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

module.exports = {
	getMongodbUri: () => {
		return `mongodb+srv://${username}:${password}@cluster0-scgro.mongodb.net/test?retryWrites=true&w=majority`
	}
}