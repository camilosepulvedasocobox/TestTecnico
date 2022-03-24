import { useRouter } from 'next/router';
import ActivityForm from '../../components/activities/activityForm';

const ActivityPage =() => {
	const router = useRouter();

	console.log(router.query);

	return (
		<div>
			<ActivityForm

			/>
		</div>
	)
}

export default ActivityPage;