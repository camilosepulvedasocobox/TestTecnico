const todosCtrl = {};

const fs = require('fs');

const Todo = require('../models/Todo');
const Activity = require('../models/Activity');

todosCtrl.getTodos = async (req, res) => {
	const ActivityTodos = await Activity.findById(req.params.id)
		.select("title description createdAt finish_date todos")
		.populate("todos");

	res.json(ActivityTodos)
}

todosCtrl.createTodo = async (req, res) => {
	const activity = req.params.id;
	const { description } = req.body;
	let filename = null;

	if (typeof req.files !== "undefined" && req.files != null) {
		const { file } = req.files;
		filename = file.name;

		fs.writeFile('../backend/uploads/' + file.name, file.data, 'ascii', (err) => {
			if (err) throw err;
		})
	}

	const newTodo = new Todo({
		description,
		file: filename
	});

	await newTodo.save()

	await Activity.findOneAndUpdate({_id: activity}, {
		$push: {
			todos: newTodo._id
		}
	},{
		new: true,
		useFindAndModify: false
	});

	res.json({message: 'Todo Saved'})
}

todosCtrl.getTodo = async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	res.json(todo)
}

todosCtrl.updateTodo = async (req, res) => {
	// Update Todo
	const { activity, completed } = req.body;
	await Todo.findOneAndUpdate({_id: req.params.id}, {
		completed
	});

	// Update Activity
	const ActivityTodos = await Activity.findById(activity)
		.select("todos")
		.populate("todos");

	if (typeof ActivityTodos.todos !== "undefined" && ActivityTodos.todos.length > 0 && ActivityTodos.todos.filter(todo => ! todo.completed).length == 0) {
		await Activity.findOneAndUpdate({_id: activity}, {
			completed: true,
			finish_date: new Date()
		});
	}
	
	res.json({message: 'Todo Updated'});
}

todosCtrl.deleteTodo = async (req, res) => {
	const { activity } = req.body
	await Todo.findByIdAndDelete(req.params.id);

	await Activity.findOneAndUpdate({_id: activity}, {
		$pull: {
			todos: req.params.id
		}
	})

	res.json({message: 'Todo Deleted'})
}

module.exports = todosCtrl;