import React, { Component } from 'react';
import axios from 'axios';

const Todo = (props): JSX.Element => {

	const { todo } = props;

	const toggleDoneTask = async () => {
		await axios.put('http://localhost:4000/api/todos/' + todo._id, {
			activity: props.activity,
			completed: ! todo.completed
		});

		props.getTodos();
	}

	const removeTask = async () => {
		await axios.delete(`http://localhost:4000/api/todos/${ todo._id }/${ props.activity }`);

		props.getTodos();
	}

	return (
		<div className="card card-body mt-2" key={ todo._id }>
			<h5 style={{ textDecoration: todo.completed ? "line-through" : "" }}>
				{todo.description}
			</h5>
			<div>
				<button
					className="btn"
					onClick={ toggleDoneTask }
				>
					{todo.completed ? "❌" : "✔"}
				</button>
				<button
					className="btn"
					onClick={ removeTask }
				>
					🗑
				</button>
				{ typeof todo.file !== "undefined" && todo.file != null && (
					<a href={"http://localhost:4000/api/uploads/" + todo.file}  download>
						{ todo.file }
					</a>
				)}
			</div>
		</div>
	);
}

export default Todo;