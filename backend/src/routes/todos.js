const { Router } = require('express');
const router = Router();

const { getTodos, createTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todos.controller');

router.route('/:id')
	.post(createTodo)
	.get(getTodos)
	.get(getTodo)
	.put(updateTodo)

router.route('/:id/:activity')
	.delete(deleteTodo)

module.exports = router;