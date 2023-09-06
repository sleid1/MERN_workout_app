import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; // CONTEXT

//COMPONENTS
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
   // const [workouts, setWorkouts] = useState([]); NOT NEEDED BECAUSE OF CONTEXT
   const { workouts, dispatch } = useWorkoutsContext();

   useEffect(() => {
      const fetchWorkouts = async () => {
         try {
            const res = await fetch('/api/workouts');

            if (!res.ok) {
               throw new Error('Network response was not ok');
            }

            const json = await res.json();
            // setWorkouts(json); NOT NEEDED BECAUSE OF CONTEXT
            dispatch({ type: 'SET_WORKOUTS', payload: json });
         } catch (error) {
            console.error(
               'There was a problem with the fetch operation:',
               error
            );
         }
      };
      fetchWorkouts();
   }, [dispatch]);

   return (
      <div className="home">
         <div className="workouts">
            {workouts &&
               workouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
               ))}
         </div>
         <WorkoutForm />
      </div>
   );
};

export default Home;
