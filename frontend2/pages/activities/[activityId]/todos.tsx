import { useRouter } from 'next/router';
import axios from 'axios'

import Todo from '../../../components/todos/todo';
import CreateTodo from '../../../components/todos/createTodo';
import activity from '../../../components/activities/activity';

const ActivityTodosPage = () => {
	const router = useRouter();

	console.log(router.query);

	return (
		<div>
			Estos serían los todos
		</div>
	)
}

export default ActivityTodosPage;