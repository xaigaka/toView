import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import StopWatch from "../StopWatchForLaps/StopWatch";

export default function DurationExercise({ exercise, navigation }) {
  const [laps, setLaps] = useState([]);
  const stopWatchRef = useRef(null);

  const recordLap = (lapTime) => {
    setLaps([...laps, lapTime]);
  };

  return (
    <View style={styles.container}>
      <Text>{exercise}</Text>
      <StopWatch recordLap={recordLap} ref={stopWatchRef} />
      <View style={styles.lapContainer}>
        {laps.map((lapTime, index) => (
          <Text key={index}>Lap {index + 1}: {formatTime(lapTime)}</Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
      < Button title="Back to Menu" onPress={() => navigation.navigate('Home')} />
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