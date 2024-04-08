import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const Question = ({ route, navigation }) => {
  const { data } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNextQuestion = () => {
    console.log("here")
    if (currentIndex < data.length - 1) {
      setUserAnswers([...userAnswers, selectedAnswer]);
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setUserAnswers([...userAnswers, selectedAnswer]); // Store the selected answer for the last question
      console.log("Navigating to Summary screen...");
      console.log("data:", data);
      console.log("userAnswers:", userAnswers);
      if (data && userAnswers) {
        navigation.navigate('Summary', { data, userAnswers });
      } else {
        console.error("Error: 'data' or 'userAnswers' is null.");
      }
    }
  };

  const handleAnswerSelection = (index) => {
    console.log("Selected answer index:", index);
  
    if (currentIndex === data.length - 1) {
      setUserAnswers([...userAnswers, index]); // Store the selected answer for the last question directly
    } else {
      // For other questions, handle answer selection as before
      if (data[currentIndex].type === "true-false") {
        setSelectedAnswer(index);
      } else if (data[currentIndex].type === "multiple-answer") {
        const newSelectedAnswers = [...(selectedAnswer || [])];
        const selectedIndex = newSelectedAnswers.indexOf(index);
  
        if (selectedIndex === -1) {
          newSelectedAnswers.push(index);
        } else {
          newSelectedAnswers.splice(selectedIndex, 1);
        }
  
        setSelectedAnswer(newSelectedAnswers.length > 0 ? newSelectedAnswers : null);
      } else {
        // Toggle the selected answer for multiple-choice questions
        setSelectedAnswer(selectedAnswer === index ? null : index);
      }
  
      // Log the updated selectedIndex state
      console.log("Updated selectedIndex:", selectedAnswer);
    }
  };
  
  const { prompt, type, choices } = data[currentIndex];

  return (
    <View>
      <Text>{prompt}</Text>
      <ButtonGroup
        onPress={handleAnswerSelection}
        selectedIndex={selectedAnswer}
        buttons={choices}
        containerStyle={{ height: 100 }}
        testID="choices"
      />
      <Button title="Next Question" onPress={handleNextQuestion} testID="next-question" />
    </View>
  );
};

export default Question;