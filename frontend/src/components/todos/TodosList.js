import React, { Component } from 'react'
import axios from 'axios'

import Todo from './Todo'
import CreateTodo from './CreateTodo'
import Activity from '../activities/Activity'

export default class TodosList extends Component {
	state = {
		todos: [],

		activityTitle: '',
		activityDescription: '',
		activityCreatedAt: null,
		activityFinish_date: null
	}

	async componentDidMount() {
		this.getTodos();
	}

	async getTodos() {
		const res = await axios.get(`http://localhost:4000/api/todos/` + this.props.match.params.id);
		this.setState({
			todos: res.data.todos,
			activityTitle: res.data.title,
			activityDescription: res.data.description,
			activityCreatedAt: res.data.createdAt,
			activityFinish_date: res.data.finish_date
		});
	}

	render() {
		return (
			<div className="container p-4">
				<div className="row">
					<Activity
						activity = { {
							title: this.state.activityTitle,
							description: this.state.activityDescription,
							createdAt: this.state.activityCreatedAt,
							finish_date: this.state.activityFinish_date,
							todos: this.state.todos
						} }
						key = { this.props.match.params.id }
						deleteActivity = { () => {} }
						interaccion = { false }
						style={{"marginTop": "-1.5rem"}}
					/>
					<div className="col-md-8">
						<div className="card">
							<div className="card-body">
								<CreateTodo
									activity = { this.props.match.params.id }
									getTodos = { this.getTodos.bind(this) }
								/>
							</div>
						</div>
						{
							this.state.todos.map((todo) => (
								<Todo
									todo = { todo }
									key = { todo._id }
									deleteTodo = { this.deleteTodo }
									getTodos = { this.getTodos.bind(this) }
									activity = { this.props.match.params.id }
								/>
							))
						}
					</div>
				</div>
			</div>
		)
	}
}
