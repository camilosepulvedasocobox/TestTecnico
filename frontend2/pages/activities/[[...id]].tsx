import { useRouter } from 'next/router';
import ActivityForm from '../../components/activities/activityForm';

const ActivityPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<div>
			<ActivityForm
				activityId={ router.query.id }
			/>
		</div>
	)
}

export default ActivityPage;