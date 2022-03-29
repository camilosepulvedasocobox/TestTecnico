import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'

import Todo from '../../../components/todos/todo';
import CreateTodo from '../../../components/todos/createTodo';
import Activity from '../../../components/activities/activity';

import { IActivity } from '../../../interfaces/Activity'

const ActivityTodosPage = (): JSX.Element => {
	const router = useRouter();
	const activityId = router.query.activityId;

	const [activity, setActivity] = useState<IActivity>({
		title: '',
		description: '',
		createdAt: null,
		finish_date: null,
		todos: []
	});

	const getTodos = async () => {
		const res = await axios.get(`http://localhost:4000/api/todos/` + activityId);
		setActivity(res.data);
	}

	useEffect(() => {
		getTodos();
	},[]);

	return (
		<div className="container p-4">
			<div className="row">
				<Activity
					activity = { activity }
					deleteActivity = { (activityId) => {} }
					interaccion = { false }
					style={{"marginTop": "-1.5rem"}}
				/>
				<div className="col-md-8">
					<div className="card">
						<div className="card-body">
							<CreateTodo
								activity = { activityId }
								getTodos = { getTodos }
							/>
						</div>
					</div>
					{
						activity.todos.map((todo) => (
							<Todo
								todo = { todo }
								key = { todo._id }
								getTodos = { getTodos }
								activity = { activityId }
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default ActivityTodosPage;