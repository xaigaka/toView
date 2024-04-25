// App.js
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DurationExercise from './components/Duration';
import RepetitionExercise from './components/Repetition';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const exercises = [
    { type: 'Repetition', name: 'Push Ups' },
    { type: 'Repetition', name: 'Squats' },
    { type: 'Duration', name: 'Running' },
    { type: 'Duration', name: 'Swimming' },
  ];

  const handleExercisePress = (exercise) => {
    if (exercise.type === 'Repetition') {
      navigation.navigate('Repetition', { name: exercise.name });
    } else if (exercise.type === 'Duration') {
      navigation.navigate('Duration', { name: exercise.name });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose an Exercise</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => handleExercisePress(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Repetition" component={RepetitionExercise} />
        <Stack.Screen name="Duration" component={DurationExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
});

export default App;
