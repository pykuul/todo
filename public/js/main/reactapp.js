$(document).ready(async function() {

	const getTodos = async function() {
		const fetch_data = await fetch('/api/todos');
		const todos = await fetch_data.json();
		return todos;
	};

	const createTodo = async function(todo) {
		
		const fetch_res = await fetch('/api/todo', {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});
		const todos = await fetch_res.json();
	};

	const updateTodo = async function(todo) {
		// put request to server		
		const fetch_res = await fetch(`/api/todo/`, {
			method: "put",
			headers : {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});
		const todos = await fetch_res.json();
	};

	const deleteTodo = async function(id) {
		const fetch_res = await fetch(`/api/todo/${id}`, {method: "DELETE"});
		const todos = await fetch_res.json();
	};

	class Jumbotron extends React.Component {
		render() {
			return (
				<div className="jumbotron text-center">
					<h1>
						Todo Dashboard !!! <span id="todos-counter" className="badge badge-info">10</span>
					</h1>
				</div>
			)
		}
	}

	class Todo extends React.Component {
		render() {
			return (
				<div className="checkbox">
					<a className="edit"><i className="far fa-edit"></i></a>
					<a className="delete" href=""><i className="far fa-trash-alt"></i></a>
					<input id="${todo._id}" className="isDone" type="checkbox" ref="isDone"/>
					<span className="todo">{this.props.children}</span>
				</div>
			)
		}
	}

	class InputForm extends React.Component {
		// Create new todo action
		AddTodo() {
			let todo = {text: this.hrefs.todo-input.value, isDone: false};
			console.log(todo);
			todos = createTodo(todo);
		}

		render() {
			return (
				<div id="todo-form" className="row">
					<div className="col-sm-8 offset-sm-2 text-center">
						<form>
							<div className="form-group">
								<input href="todo-input" id="todo-input" className="form-control form-control-lg text-center" type="text" name="" placeholder="What do you want to do today?" />
							</div>
							<button onClick={this.AddTodo} id="createTodo" type="submit" className="btn btn-primary btn-lg">Add</button>
						</form>
					</div>
				</div>
			)
		}
	}

	class List extends React.Component {
		
		getInitialState() {
			return {todos: todos};
		}

		render() {
			// this.state.todos = await getTodos();
			return (
				<div>
					<Jumbotron > </Jumbotron>
					<div id="todo-list" className="row">
						<div id="show-list-todo" className="col-sm-6 offset-sm-3">
							{
								this.state.todos.map(function(todo, id) {
									return <Todo key={id}>{todo.text}</Todo>
								})
							}
						</div>
					</div>
					<InputForm> </InputForm>
				</div>
			)
		}
	}

	//////////////////////////////////////////
	let todos = await getTodos();
	console.log(todos);

	List.state.todos = todos;

	ReactDOM.render(<List />, document.getElementById('root'));
})