import React, { Component } from 'react';
import axios from 'axios';

class Todo extends Component {
	
	render() {
		const { todo } = this.props;

		const toggleDoneTask = async () => {
			await axios.put('http://localhost:4000/api/todos/' + todo._id, {
				activity: this.props.activity,
				completed: ! todo.completed
			});

			this.props.getTodos();
		};

		const removeTask = async () => {
			await axios.delete('http://localhost:4000/api/todos/' + todo._id, {
				activity: this.props.activity
			});

			this.props.getTodos();
		};

		return <div className="card card-body mt-2" key={ todo._id }>
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
				{ typeof todo.file !== "undefined" && (
					<a href={"http://localhost:4000/api/uploads/" + todo.file}  download>
						{ todo.file }
					</a>
				)}
			</div>
		</div>
	}
}
export default Todo;