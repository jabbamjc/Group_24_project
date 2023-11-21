import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { getItem as localStorageGetItem, setItem as localStorageSetItem } from './LocalStorage';

function secondsToTime(e){
    m = Math.floor(e % 3600 / 60).toString().padStart(2,'0');
    s = Math.floor(e % 60).toString().padStart(2,'0');
    
    return m + ':' + s;
  }

export default function Timer() {
  const [text, setText] = useState(secondsToTime(0))

  useEffect(() => {
    const interval = setInterval( async () => {

      secondsLeft = parseInt(await localStorageGetItem("secondsLeft"));

      if (secondsLeft >= 0){
        setText(secondsToTime(secondsLeft));
        secondsLeft -= 1;
        localStorageSetItem("secondsLeft", secondsLeft);
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Text style={styles.timer}>{text}</Text>
  );
}
  
const styles = StyleSheet.create({
  timer: {
    fontSize: 25,
  },
});