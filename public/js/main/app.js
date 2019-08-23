$(document).ready(async function() {
	
	const showTodos = function (todos) {
		// show number of todos
		$('#todos-counter').text(todos.length);

		// show todo list
		todos.forEach(function(todo){
			let htmlContent = `<div class="checkbox">
									<a class="edit"><i class="far fa-edit"></i></a>
									<a class="delete" href=""><i class="far fa-trash-alt"></i></a>`;
			if(todo.isDone){
				htmlContent += `	<input id="${todo._id}" class="isDone" type="checkbox" checked>
									<span class="todo strike">${todo.text}</span></div>`;
			}else{
				htmlContent += `  	<input id="${todo._id}" class="isDone" type="checkbox">
									<span class="todo">${todo.text}</span></div>`;
			}
			
			$('#show-list-todo').append(htmlContent)
		});

		$('#todo-input').text("");
		$('#createTodo').prop("disabled", true);
	};

	const getTodos = async function() {
		const fetch_data = await fetch('/api/todos');
		const todos = await fetch_data.json();
		showTodos(todos);
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

	// show todos list on webpage
	await getTodos();

	// set "ADD" button disabled if input text is empty
	$('#todo-input').keyup(function() {
		if($(this).val() != "") {
			$('#createTodo').prop("disabled", false);
		} else {
			$('#createTodo').prop("disabled", true);
		}
	});
	
	// Create new todo action
	$('#createTodo').click(function() {
		// get the new todo value
		let todo =  {text: $('#todo-input').val(), isDone: false};
		// call server to add new todo
		createTodo(todo);
	});

	// isDone todo action
	$('.isDone').on('click', function() {
		// get the current todo status
		let todo = {
			id: $(this).attr('id'),
			text: $(this).next().text().trim(),
			isDone: false
		};

		// set todo status based on checkbox status
		if ($(this).prop('checked')){
			$(this).next().addClass('strike');
			todo.isDone = true;
		} else {
			$(this).next().removeClass('strike');
		}

		// call server to save update todo status
		updateTodo(todo);
	});

	// Edit todo action
	$('.edit').click(function() {
		// take the current todo and save to variable
		let todo = {};
		todo.id = $(this).next().next().attr('id');
		todo.text = $(this).next().next().next().text();

		if($(this).next().next().prop('checked')) {
			todo.isDone = true;
		}else{
			todo.isDone = false;
		}
		
		// show the editable area for editing todo
		$(this+`input#${todo.id}+span.todo`).replaceWith(`
			<input id="replace-todo" type="text" value="${todo.text}">
			<a class="editTodoSave" href=""><i class="fas fa-check"></i></a>
		`)

		// save the edited todo action
		$('.editTodoSave').click(function(){
			// get the new text
			todo.text=$(this).prev().val();
			// call serser to update todo
			updateTodo(todo);
		});
	});

	// Delete Todo action
	$('.delete').click(function() {
		// get todo._id
		let id = $(this).next().attr('id');
		// call server to delete todo
		deleteTodo(id);
	});
})