import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to store user data in AsyncStorage
  const LoginTest = {
    testID: "login-username",
    LoginStr: "test"
  };
  const PasswordTest = {
    testID: "login-password",
    LoginStr: "Test@1"
  };

  async function storeUser(userData) {
    try {
      await AsyncStorage.setItem('loginData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Call storeUser function with LoginTest and PasswordTest on component mount
    storeUser({ username: LoginTest.LoginStr, password: PasswordTest.LoginStr });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to handle login
  const handleLogin = async () => {
    try {
      const newStoredUserData = await AsyncStorage.getItem('newLoginData');
      const newUserData = newStoredUserData ? JSON.parse(newStoredUserData) : null;
  
      if (newUserData && newUserData.username === username && newUserData.password === password) {
        navigation.navigate('To Do', { nameTitle: newUserData.firstName + " " + newUserData.lastName, userTitle: newUserData.username });
        setError('')
        return;
      }
    } catch (error) {
      console.error('Error fetching new login data:', error);
    }
  
    try {
      const storedUserData = await AsyncStorage.getItem('loginData');
      const userData = storedUserData ? JSON.parse(storedUserData) : null;
  
      if (userData && userData.username === username && userData.password === password) {
        navigation.navigate('To Do', { nameTitle: userData.firstName + " " + userData.lastName, userTitle: userData.username });
        setError('')
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching login data:', error);
    }
  };
  
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Input
                placeholder="Login"
                onChangeText={setUsername}
                value={username}
                testID="login-username"
            />
            <Input
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                testID="login-password"
            />
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} testID="login-button" />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
                testID="login-register"
            />
            </View>
        </SafeAreaView>
    );
  }
  
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