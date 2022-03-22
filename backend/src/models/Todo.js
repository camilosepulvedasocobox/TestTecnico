const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
	description: String,
	completed: {
		type: Boolean,
		default: false
	},
	file: String
}, {
	timestamps: true
});

// todos
module.exports = model('Todo', todoSchema);