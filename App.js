import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import Button from './components/Button';
import Rocket from './Rocket';
import Timer from './components/Timer';
import { getItem as localStorageGetItem, setItem as localStorageSetItem, addToItem as LocalStorageAddToItem } from './components/LocalStorage';


import questions from './components/questions.json'
qIndex = 0;
localStorageSetItem("secondsLeft", questions.startSeconds);

export default function App() {
  localStorageSetItem("questions", questions);

  const [correctAnswers, setCorrectAnswers] = useState("0");

  const [questionText, setQuestionText] = useState("");
  const [q1, setq1Text] = useState("");
  const [q2, setq2Text] = useState("");
  const [q3, setq3Text] = useState("");
  const [q4, setq4Text] = useState("");

  nextQuestion = async (data, e) => {
    if (questions.questions[qIndex].correct == data){
      //do stuff when answer is correct
      console.log("correct")
      LocalStorageAddToItem("secondsLeft", 5)
      setCorrectAnswers(parseInt(correctAnswers) + 1)

      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
    }
    else{
      //do stuff when answer is incorrect 
      console.log("incorrect")

      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      )
    }

    qIndex += 1
    q = questions.questions[qIndex];

    if (qIndex == questions.questions.length){
      setQuestionText("Done");
      return;
    }

    setQuestionText(q.question);
  
    setq1Text(q.answers[0]);
    setq2Text(q.answers[1]);
    setq3Text(q.answers[2]);
    setq4Text(q.answers[3]);
  }

  useEffect(() => {
    q = questions.questions[0];

    setQuestionText(q.question);
  
    setq1Text(q.answers[0]);
    setq2Text(q.answers[1]);
    setq3Text(q.answers[2]);
    setq4Text(q.answers[3]);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Timer/>
        <Text style={{position: 'absolute', right: 35, fontSize: 25}} >{correctAnswers}</Text>
      </View>

      <Rocket/>

      <View style={styles.question_view}>
        <Text style={styles.question_text}>{questionText}</Text>
      </View>

      <View style={styles.questionContainer} onLoad>
        <View style={styles.footerContainer}>
          <Button label={q1} onPressArg={this.nextQuestion.bind(this, q1)} />
          <Button label={q2} onPressArg={this.nextQuestion.bind(this, q2)} />
        </View>
        <View style={styles.footerContainer}> 
          <Button label={q3} onPressArg={this.nextQuestion.bind(this, q3)} />
          <Button label={q4} onPressArg={this.nextQuestion.bind(this, q4)} />
        </View>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  questionContainer: {
    height: "18%",
    width: "98%",
    marginTop: 10,
  },
  footerContainer: {
    flex: 1,
    height: "50%",
    minHeight: "50%",
    maxHeight: "50%",
    alignItems: 'center',
    flexDirection: 'row',
  },
  question_view: {
    height: "15%",
    width: "95%",
    padding: 10,
    marginTop: 0,
    
    alignItems: 'center',
    justifyContent: "center",

    borderRadius: 10,
    backgroundColor: "#013567",
  },
  question_text: {
    textAlignVertical: "center",
    color: "white",
    fontSize: 25,
  },
  header: {
    width: "95%",
    maxHeight: "5%",

    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 35,

    //borderColor: "black",
    //borderWidth: 2,
  },
  
});
