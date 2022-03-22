const activitiesCtrl = {};

const Activity = require('../models/Activity');
const Todo = require('../models/Todo');

activitiesCtrl.getActivities = async (req, res) => {
	const { query } = req; 
	const activities = await Activity.find({
			completed: (query.resueltas == 0 ? false : true)
		}, {

		})
		.sort({
			[query.creacion == 0 ? 'createdAt' : 'finish_date'] : -1
		})
		.populate("todos");

	res.json(activities)
}

activitiesCtrl.createActivity = async (req, res) => {
	const { title, description } = req.body;

	const newActivity = new Activity({
		title: title,
		description: description
	});

	await newActivity.save();
	res.json({message: 'Activity Saved'})
}

activitiesCtrl.getActivity = async (req, res) => {
	const activity = await Activity.findById(req.params.id)
		.populate({
			path: 'todos',
			select: "description completed"
		})
	res.json(activity)
}

activitiesCtrl.updateActivity = async (req, res) => {
	const { title, description } = req.body;
	await Activity.findOneAndUpdate({_id: req.params.id}, {
		title,
		description
	});

	res.json({message: 'Activity Updated'});
}

activitiesCtrl.deleteActivity = async (req, res) => {
	const todos = await Activity.findById(req.params.id)
		.select('todos')

	if(typeof todos.todos !== "undefined" && todos.todos.length > 0) {
		todos.todos.forEach(async todo => {
			await Todo.findOneAndDelete(todo);
		});
	}

	await Activity.findByIdAndDelete(req.params.id);
	res.json({message: 'Activity Deleted'})
}

module.exports = activitiesCtrl;