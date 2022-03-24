import { useRouter } from 'next/router';
import axios from 'axios'



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