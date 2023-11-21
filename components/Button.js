import { StyleSheet, View, Pressable, Text } from 'react-native';
import { getItem as localStorageGetItem, setItem as localStorageSetItem, addToItem as LocalStorageAddToItem } from './LocalStorage';

export default function Button({ label, backgroundColor="none", onPressArg=() => null, textColor="#013567" }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, { backgroundColor: backgroundColor }]} onPress={onPressArg} >
        <Text style={[styles.buttonLabel, {color: textColor}]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
    maxWidth: "50%",
    minWidth: "50%",
    height: "auto",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 35,
  },
  button: {
    borderRadius: 35,
    backgroundColor: 'green',
    borderWidth: 3,
    borderColor: "#013567",
    
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});