const Todos = require("../models/todoModel");

module.exports = (app) => {
	app.get("/api/setupTodos", (req, res) => {
		// setup seed data
		let seedTodos = [
			{
				text: "Học NodeJS",
				isDone: false
			},
			{
				text: "Học AngularJS",
				isDone: false
			},
			{
				text: "Viết 2 ứng dụng hoàn chỉnh: Node Todo và AutoCiis online book Library",
				isDone: false
			}
		];

		Todos.create(seedTodos, (err, result) => {
			if(err) return console.error(err);
			res.send(result);
		})
	});
}