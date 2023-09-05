const WorkoutDetails = ({ workout }) => {
   const handleDelete = async (id) => {
      const response = await fetch(`/api/workouts/${id}`, {
         method: 'DELETE',
      });
      const json = await response.json();
      console.log(json);
   };

   return (
      <div className="workout-details">
         <h4>{workout.title}</h4>
         <p>
            <strong>Load (kg): </strong>
            {workout.load}
         </p>
         <p>
            <strong>Reps: </strong>
            {workout.reps}
         </p>
         <p>{workout.createdAt}</p>
         <button onClick={() => handleDelete(workout._id)}>
            Delete workout
         </button>
      </div>
   );
};

export default WorkoutDetails;
