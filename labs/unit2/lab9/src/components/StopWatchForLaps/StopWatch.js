import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const exercises = [
    { type: 'Repetition', name: 'Push Ups' },
    { type: 'Repetition', name: 'Squats' },
    { type: 'Duration', name: 'Running' },
    { type: 'Duration', name: 'Swimming' },
];

let randomIndex = Math.floor(Math.random() * exercises.length);
let randomExercise = exercises[randomIndex];
let suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;

export default function StopWatch({ recordLap }) {
    const route = useRoute();
    const theName = route.params?.name || '';

    while (theName === randomExercise.name) {
        randomIndex = Math.floor(Math.random() * exercises.length);
        randomExercise = exercises[randomIndex];
        suggestedExercise = `Suggested Exercise: ${randomExercise.name}`;
    }

    const navigation = useNavigation();

    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([]);

    const updateTimer = useCallback(() => {
        if (running) {
            setTimer(prevTimer => prevTimer + 10);
        }
    }, [running]);

    useEffect(() => {
        let currentTimer;
        if (running) {
            currentTimer = setInterval(updateTimer, 10);
        }
        return () => clearInterval(currentTimer);
    }, [running, updateTimer]);

    const startStop = () => {
        setRunning(!running);
    };

    const reset = () => {
        setTimer(0);
        setLaps([]);
    };

    const recordLapHandler = () => {
        if (running) {
            const lapTime = timer;
            setLaps([...laps, lapTime]);
            recordLap(lapTime);
        }
    };

    const mins = String(Math.floor((timer / (1000 * 60)) % 60)).padStart(2, "0");
    const secs = String(Math.floor((timer / 1000) % 60)).padStart(2, "0");
    const mills = String((timer % 1000)).padStart(3, "0");

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.header}>{theName}</Text>
                <View style={styles.lapContainer}>
                    {laps.map((lapTime, index) => (
                        <Text key={index}>Time {index + 1}: {formatTime(lapTime)}</Text>
                    ))}
                </View>
                <View style={styles.timerContainer}>
                    <Text style={styles.timer}>
                        {mins}:{secs}.{mills}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title={running ? "Pause" : "Start"}
                    onPress={startStop}
                    style={styles.button}
                />
                <Button
                    title="Reset"
                    onPress={reset}
                    style={styles.button}
                />
                <Button
                    title="Record Time"
                    onPress={recordLapHandler}
                    style={styles.button}
                />
                <Button
                    title="Back to Menu"
                    onPress={() => navigation.navigate('Home')}
                    style={styles.button}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title={suggestedExercise}
                    onPress={() => navigation.navigate(randomExercise.type, { name: randomExercise.name })}
                    style={styles.button}
                />
            </View>
            <View style={styles.bottomSpace} />
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
    header: {
        fontSize: 50,
        fontWeight: "500"
    },
    timer: {
        fontSize: 70,
        fontWeight: "500"
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lapContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        width: "400"
    },
    button: {
        marginVertical: 10,
        fontSize: 20,
        width: 400, // Adjust the width as needed
    },
    bottomSpace: {
        height: 300 // Adjust as needed for desired space
    }
});
