import './App.css';
import { useCallback, useState } from 'react';
import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';
import RunningExercise from './components/RunningExercise';

// Follows Murray's Walkthrough

const MENU_SCREEN = "menu";
const EXERCISE_SCREEN = "exercise";
const DURATION_EXERCISE = "duration";
const REPETITION_EXERCISE = "repetition";
const LAPS_EXERCISE = "laps"


let exerciseList = [
  {type: DURATION_EXERCISE, name: "Running"},
  {type: DURATION_EXERCISE, name: "Rowing"},
  {type: DURATION_EXERCISE, name: "Swimming"},
  {type: REPETITION_EXERCISE, name: "Push Ups"},
  {type: LAPS_EXERCISE, name: "Running with Laps"}
]

function App() {
  let [currentScreen, setCurrentScreen] = useState(MENU_SCREEN)
  let [currentExercise, setCurrentExercise] = useState({})
  let screenComponent = undefined
  let buttonClick = useCallback((exercise) => {
    setCurrentExercise(exercise)
    setCurrentScreen(EXERCISE_SCREEN)
  })

  if (currentScreen === MENU_SCREEN) {
    screenComponent = (
      <div>
        <p>Exercise Menu</p>
        <ul>
          {exerciseList.map(({type, name}) => {
            return <li key={name}>
            <button style={{fontSize:"1em", margin:"10px", padding:"5px"}} onClick={() => buttonClick({ type, name })}>{name}</button>
          </li>
          })}
        </ul>
      </div>
    );
  } else if (currentScreen === EXERCISE_SCREEN) {
    switch(currentExercise.type){
      case DURATION_EXERCISE:
        screenComponent = <DurationExercise 
        exercise={currentExercise}  
        setMenuScreen={() => setCurrentScreen(MENU_SCREEN)}
        />
      break;
      case REPETITION_EXERCISE:
        screenComponent = <RepetitionExercise 
        exercise={currentExercise}  
        setMenuScreen={() => setCurrentScreen(MENU_SCREEN)}
        />
      break;
      case LAPS_EXERCISE:
        screenComponent = <RunningExercise 
        exercise={currentExercise}  
        setMenuScreen={() => setCurrentScreen(MENU_SCREEN)}
        />
      break;
      default:
        screenComponent = undefined
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        {screenComponent} {/* Render screenComponent here */}
      </header>
    </div>
  );
}

export default App;
