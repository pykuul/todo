const Todos = require("../models/todoModel");

const getTodos = (res) => {
	Todos.find((err, todos) => {
		if (err) {
			res.status(500).json(err);
		}else{
			res.json(todos);
		}
	})
}

module.exports = (app) => {
	// return all dodos
	app.get('/api/todos', (req, res) => {
		getTodos(res);
	})

	// find a todo /api/todo/1233445
	app.get('/api/todo/:id', (req, res) => {
		Todos.findById({_id: req.params.id}, (err, todo) => {
			if (err) {
				throw err;
			}else{
				res.json(todo);
			}
		})
	})

	// create a todo
	app.post('/api/todo', (req, res) => {
		let todo = {
			text: req.body.text,
			isDone: req.body.isDone
		};

		Todos.create(todo, (err, todo) => {
			if (err) {
				throw err;
			}else{
				getTodos(res);
			}
		});
	})

	// update todo
	app.put('/api/todo/', (req, res) => {
		if(!req.body.id) return res.status(500).send("ID is required")
		
		Todos.updateOne({
			_id: req.body.id
		}, {
			text: req.body.text,
			isDone: req.body.isDone
		}, (err, todo) => {
			if(err) return res.status(500).json(err);
			getTodos(res);
		});
	})

	// delete todo
	app.delete('/api/todo/:id', (req, res) => {
			Todos.deleteOne({_id: req.params.id}, (err) => {
			if(err) return res.status(500).json(err);
			getTodos(res);
			console.log(req.params.id);
		});
	})
}