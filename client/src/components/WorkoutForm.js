import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFiels] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must me logged in');
      return;
    }
    
    const workout = { title, load, reps };

    const res = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFiels(json.emptyFields)
    }
    if (res.ok) {
      setTitle("");
      setLoad("")
      setReps("");
      setError(null);
      setEmptyFiels([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      console.log('New workout added', json);
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      
      <label>Excersise title : </label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      
      <label>Load (in kg) : </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps : </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button> 
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;