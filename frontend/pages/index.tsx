import ActivitiesList from '../components/activities/activitiesList';

const HomePage = (): JSX.Element => {
  return (
      <div className='container p-4'>
        <ActivitiesList />
      </div>
  );
}

export default HomePage;