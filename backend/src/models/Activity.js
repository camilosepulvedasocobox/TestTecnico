const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
	title: String,
	description: String,
	completed: {
		type: Boolean,
		default: false
	},
	finish_date: Date,
	todos: [{
		type: Schema.Types.ObjectId, ref: 'Todo'
	}]
}, {
	timestamps: true
});

// activities
module.exports = model('Activity', activitySchema);