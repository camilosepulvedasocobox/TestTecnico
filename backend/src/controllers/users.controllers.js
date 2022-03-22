const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
	const users = await User.find();
	res.json(users);
}

userCtrl.createUser = async (req, res) => {
	const { username, password } = req.body;
	const newUser = new User({
		username: username,
		password: password
	});
	await newUser.save();
	res.json('User created');
}

userCtrl.deleteUser = async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.send('User deleted');
}

module.exports = userCtrl;