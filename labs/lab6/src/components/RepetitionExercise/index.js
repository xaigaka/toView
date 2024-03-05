import { useCallback, useState } from 'react';

export default function RepetitionExercise({exercise,  setMenuScreen}) {
    let [count, setcount] = useState(0)
  
    return (
    <div>
      <p>{exercise.name}</p>
      <p style={{fontSize:"5em"}}>{count}</p>
      <button style={{fontSize:"2em"}} onClick={() => setcount(count=>count+1)}>Increment</button>
      <button style={{fontSize:"2em"}} onClick={() => setcount(0)}>Reset</button>
      <br></br> <br></br>
      <button style={{fontSize:"1em"}} onClick={setMenuScreen}>Back to Menu</button>
    </div>
    );
  }
  