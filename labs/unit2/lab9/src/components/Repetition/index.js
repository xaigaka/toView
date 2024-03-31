import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RepetitionExercise({ exercise, navigation }) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>{exercise}</Text>
      <Text style={styles.count}>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count => count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />
      <View style={styles.buttonContainer}>
        <Button title="Back to Menu" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
