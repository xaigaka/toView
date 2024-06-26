import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function ToDo({ navigation, route }) {
  const { nameTitle, userTitle } = route.params;

  const [tasks, setTasks] = useState([
    { key: 1, description: 'Task 1', completed: false },
    { key: 2, description: 'Task 2', completed: false },
    { key: 3, description: 'Task 3', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { key: tasks.length + 1, description: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const handleToggleTask = (taskKey) => {
    const updatedTasks = tasks.map(task =>
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    console.log(updatedTasks)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{nameTitle}'s To-Do List</Text>
        <Text>@{userTitle}</Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <TouchableOpacity onPress={() => handleToggleTask(item.key)}>
              <CustomCheckBox checked={item.completed} />
            </TouchableOpacity>
            <ListItem.Content>
              <ListItem.Title style={item.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}>
                {item.description}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          onSubmitEditing={handleAddTask} // Handle task addition when Enter is pressed
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const CustomCheckBox = ({ checked }) => (
  <View style={[styles.checkbox, checked && styles.checked]} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer:{
    paddingTop: 40,
    paddingHorizontal: 24,
    marginBottom: 10,
    paddingBottom: 20,
    backgroundColor: 'rgb(63,163,185)',
  },
  sectionTitle: {
    fontSize:30,
    fontWeight:'600'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'rgb(63,163,185)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
  },
  checked: {
    backgroundColor: 'rgb(63,163,185)',
  },
});