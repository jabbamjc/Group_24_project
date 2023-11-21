import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { getItem as localStorageGetItem, setItem as localStorageSetItem } from './components/LocalStorage';

const PlaceholderImage = require('./assets/rocket_ship.png');

export default function Rocket() {

  useEffect(() => {
    const interval = setInterval( async () => {

      secondsLeft = parseInt(await localStorageGetItem("secondsLeft"));

      if (secondsLeft > 0){
        marginB.value = secondsLeft*(10);
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [])

  const marginB = useSharedValue(320);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
  };

  const style = useAnimatedStyle(() => {
    return {
      marginBottom: withTiming(marginB.value, config),
    };
  });

  return (
    <View style={styles.imageContainer}>
        <Animated.View style={[{}, style]}>
            <Image source={PlaceholderImage} style={styles.rocketImage}/>
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    rocketImage: {
      width: 100,
      height: 100,
  
      marginBottom: 0,
    },
    imageContainer: {
      flex: 1,
      maxHeight: "52%",

      justifyContent: "flex-end",
  
      padding: 5,
      marginBottom: 5,
    },
  });