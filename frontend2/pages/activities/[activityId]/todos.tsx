import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'

import Todo from '../../../components/todos/todo';
import CreateTodo from '../../../components/todos/createTodo';
import Activity from '../../../components/activities/activity';

interface ITodo {
	_id: string;
	description: string;
	completed: boolean;
	file: string;
	createdAt: string | Date;
	updatedAt: string | Date;
	__v: number;
}
interface IActivity {
	title: string;
	description: string;
	createdAt: string | Date;
	finish_date: string | Date;
	todos: ITodo[]
}

const ActivityTodosPage = (): JSX.Element => {
	const router = useRouter();
	const activityId = router.query.activityId;

	const [activity, setActivity] = useState<IActivity>({
		title: '',
		description: '',
		createdAt: '',
		finish_date: '',
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
					key = { activityId }
					deleteActivity = { () => {} }
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