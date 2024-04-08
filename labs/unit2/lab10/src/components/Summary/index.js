import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ route }) => {
  const { data } = route.params;
  let totalScore = 0;

  const calculateScore = (userAnswers) => {
    let score = 0;
    data.forEach((question, index) => {
      if (question.type === 'true-false' || question.type === 'multiple-choice') {
        if (question.correct === userAnswers[index]) {
          score++;
        }
      } else if (question.type === 'multiple-answer') {
        const selectedAnswers = userAnswers[index];
        const correctAnswers = question.correct;
        if (
          selectedAnswers.length === correctAnswers.length &&
          selectedAnswers.every((answer) => correctAnswers.includes(answer))
        ) {
          score++;
        }
      }
    });
    return score;
  };

  totalScore = calculateScore(route.params.userAnswers);

  return (
    <View style={styles.container}>
      <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
      {data.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionPrompt}>{question.prompt}</Text>
          {question.choices.map((choice, choiceIndex) => (
            <Text key={choiceIndex} style={styles.choiceText}>
              {choiceIndex + 1}.{' '}
              {choiceIndex === question.correct ? (
                <Text style={styles.correctAnswer}>{choice}</Text>
              ) : (
                route.params.userAnswers[index] === choiceIndex ? (
                  <Text style={styles.wrongAnswer}>{choice}</Text>
                ) : (
                  choice
                )
              )}
            </Text>
          ))}
          {question.type === 'true-false' || question.type === 'multiple-choice'
            ? (
              <Text>
                Correct Answer: {question.choices[question.correct]}
              </Text>
            )
            : (
              <Text>
                Correct Answers: {question.correct.map((index) => question.choices[index]).join(', ')}
              </Text>
            )
          }
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionPrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
  },
  correctAnswer: {
    color: 'green',
  },
  wrongAnswer: {
    color: 'red',
  },
});

export default Summary;