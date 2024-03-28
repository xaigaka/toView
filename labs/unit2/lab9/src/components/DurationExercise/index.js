import StopWatch from "../StopWatch/StopWatch";

export default function DurationExercise({ exercise, setMenuScreen }) {
  return (
    <div>
      <p>{exercise.name}</p>
      <StopWatch />
      <br></br>
      <button style={{fontSize:"1em"}} onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}