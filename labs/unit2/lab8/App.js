import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './components/Register';

import ToDo from './components/ToDo';
import HomeScreen from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={HomeScreen} />
        <Stack.Screen name="To Do" component={ToDo} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}