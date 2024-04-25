import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StopWatch from "../StopWatchForLaps/StopWatch";

const exercises = [
  { type: 'Repetition', name: 'Push Ups' },
  { type: 'Repetition', name: 'Squats' },
  { type: 'Duration', name: 'Running' },
  { type: 'Duration', name: 'Swimming' },
];

export default function DurationExercise() {
  const route = useRoute();
  const { name } = route.params || {};
  const navigation = useNavigation();

  const [laps, setLaps] = useState([]);
  const [suggestedExercise, setSuggestedExercise] = useState("");

  useEffect(() => {
    let randomIndex;
    let randomExercise;
    do {
      randomIndex = Math.floor(Math.random() * exercises.length);
      randomExercise = exercises[randomIndex];
    } while (randomExercise.name === name);
    setSuggestedExercise(randomExercise.name);
  }, [name]);

  const recordLap = (lapTime) => {
    setLaps([...laps, lapTime]);
  };

  return (
    <View style={styles.container}>
      <StopWatch recordLap={recordLap} />
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
