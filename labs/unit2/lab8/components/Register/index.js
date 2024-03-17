import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, CheckBox } from 'react-native-elements';


export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    confirmPassword: '',
    email: '',
    zipCode: '',
  });

  // Function to store user data in AsyncStorage
  async function storeUser(userData) {
    try {
      await AsyncStorage.setItem('newLoginData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle registration
  const handleRegister = async () => {
    // Validate all fields
    const isValid = validateFields();
    if (isValid) {
      // If all fields are valid, proceed with registration
      const userData = {
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
        email,
        zipCode,
        newsletter,
      };
      await storeUser(userData);
      navigation.navigate('Login'); // Navigate to Login screen after registration
    }
  };

// Function to validate all fields
const validateFields = () => {
    let valid = true;
    const newErrors = { ...errors };
  
    // Validate first name
    if (!/^[^\d=?\\/@#%^&*()]+$/.test(firstName)) {
      newErrors.firstName = 'Error: First Name must only include word or symbol characters, no numbers.';
      valid = false;
    } else {
      newErrors.firstName = '';
    }
  
    // Validate last name
    if (!/^[^\d=?\\/@#%^&*()]+$/.test(lastName)) {
      newErrors.lastName = 'Error: Last Name must only include word or symbol characters, no numbers.';
      valid = false;
    } else {
      newErrors.lastName = '';
    }
  
    // Validate username (assuming it must be alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Error: Username must only include alphanumeric characters.';
      valid = false;
    } else {
      newErrors.username = '';
    }
  
    // Validate phone number (assuming format is (xxx) xxx-xxxx)
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Error: Phone Number must be in the format (xxx) xxx-xxxx.';
      valid = false;
    } else {
      newErrors.phoneNumber = '';
    }
  
    // Validate password (assuming it must contain at least one uppercase, one lowercase, one number, and one non-alphanumeric character)
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s:])/.test(password)) {
      newErrors.password = 'Error: Password must contain at least one uppercase letter, one lowercase letter, one number, and one non-alphanumeric character.';
      valid = false;
    } else {
      newErrors.password = '';
    }
  
    // Validate confirm password
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Error: Confirm Password must match the Password.';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }
  
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Error: Email must be in a valid format (e.g., example@example.com).';
      valid = false;
    } else {
      newErrors.email = '';
    }
  
    // Validate ZIP code (assuming it must be 5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = 'Error: ZIP Code must be 5 digits.';
      valid = false;
    } else {
      newErrors.zipCode = '';
    }
  
    setErrors(newErrors);
    return valid;
  };
  

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Registration Screen</Text>
        <Input
          label="First Name"
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
          testID="firstname"
          errorMessage={errors.firstName}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          onChangeText={setLastName}
          value={lastName}
          testID="lastname"
          errorMessage={errors.lastName}
        />
        <Input
          label="Username"
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          testID="username"
          errorMessage={errors.username}
        />
        <Input
          label="Phone Number"
          placeholder="(xxx) xxx-xxxx"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          testID="phonenumber"
          errorMessage={errors.phoneNumber}
        />
        <Input
          label="Password"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          testID="password"
          errorMessage={errors.password}
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          testID="confirmpassword"
          errorMessage={errors.confirmPassword}
        />
        <Input
          label="Email"
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          testID="email"
          errorMessage={errors.email}
        />
        <Input
          label="ZIP Code"
          placeholder="ZIP Code"
          onChangeText={setZipCode}
          value={zipCode}
          testID="zip"
          errorMessage={errors.zipCode}
        />
        <CheckBox
          title="Sign up for newsletter"
          checked={newsletter}
          onPress={() => setNewsletter(!newsletter)}
          testID="newsletter"
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
  },
});