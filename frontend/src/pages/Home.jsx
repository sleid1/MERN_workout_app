import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; // CONTEXT
import { useAuthContext } from '../hooks/useAuthContext';

//COMPONENTS
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
   // const [workouts, setWorkouts] = useState([]); NOT NEEDED BECAUSE OF CONTEXT
   const { workouts, dispatch } = useWorkoutsContext();
   const { user } = useAuthContext();

   useEffect(() => {
      const fetchWorkouts = async () => {
         try {
            const res = await fetch('/api/workouts', {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            });

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

      if (user) {
         fetchWorkouts();
      }
   }, [dispatch, user]);

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
