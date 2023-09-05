import { useEffect, useState } from 'react';

//COMPONENTS
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
   const [workouts, setWorkouts] = useState([]);

   useEffect(() => {
      const fetchWorkouts = async () => {
         try {
            const res = await fetch('/api/workouts');

            if (!res.ok) {
               throw new Error('Network response was not ok');
            }

            const json = await res.json();
            setWorkouts(json);
         } catch (error) {
            console.error(
               'There was a problem with the fetch operation:',
               error
            );
         }
      };
      fetchWorkouts();
   }, []);

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
