import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StopWatch from "../StopWatchForLaps/StopWatch";


const exercises = [
  { type: 'Repetition', name: 'Push Ups' },
  { type: 'Repetition', name: 'Squats' },
  { type: 'Duration', name: 'Running' },
  { type: 'Duration', name: 'Swimming' },
];

let randomIndex = Math.floor(Math.random() * exercises.length);
let randomExercise = exercises[randomIndex];
let suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;

export default function DurationExercise({ route }) {
  const theName = route.params.name;
  while(theName == randomExercise.name){
    randomIndex = Math.floor(Math.random() * exercises.length);
    randomExercise = exercises[randomIndex];
    suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;
  }
  
  const [laps, setLaps] = useState([]);
  const stopWatchRef = useRef(null);
  const navigation = useNavigation();

  const recordLap = (lapTime) => {
    setLaps([...laps, lapTime]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header} >{theName}</Text>
      <StopWatch recordLap={recordLap} ref={stopWatchRef} />
      <View style={styles.lapContainer}>
        {laps.map((lapTime, index) => (
          <Text key={index}>Time {index + 1}: {formatTime(lapTime)}</Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back to Menu" onPress={() => navigation.navigate('Home')} />
        <Button title={suggestedExercise} onPress={() => navigation.navigate(randomExercise.type, { name: randomExercise.name })} />
      </View>
    </View>
  );
}

function formatTime(time) {
  const mins = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
  const secs = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
  const mills = Math.floor((time % 1000)).toString().padStart(3, "0");
  return `${mins}:${secs}.${mills}`;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    fontWeight: "500"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
