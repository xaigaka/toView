import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const exercises = [
  { type: 'Repetition', name: 'Push Ups' },
  { type: 'Repetition', name: 'Squats' },
  { type: 'Duration', name: 'Running' },
  { type: 'Duration', name: 'Swimming' },
];

let randomIndex = Math.floor(Math.random() * exercises.length);
let randomExercise = exercises[randomIndex];
let suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;

export default function RepetitionExercise({ route }) {
  const theName = route.params.name;
  while(theName == randomExercise.name){
    randomIndex = Math.floor(Math.random() * exercises.length);
    randomExercise = exercises[randomIndex];
    suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;
  }
  
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header} >{theName}</Text>
      <Text style={styles.count}>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count => count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
      <View style={styles.buttonContainer}>
        <Button title="Back to Menu" onPress={() => navigation.navigate('Home')} />
        <Button title={suggestedExercise} onPress={() => navigation.navigate(randomExercise.type, { name: randomExercise.name })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    fontWeight: "500"
  },
  count: {
    fontSize: 50,
    fontWeight: "500",
    marginBottom: 30,
    marginTop: 30
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
