import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function SleepScreen() {
  const [sleep, setSleep] = useState(100);

  const sleepPet = () => {
    if (sleep < 100) {
      setSleep(sleep + 10);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sono: {sleep}</Text>
      <Button title="Dormir" onPress={sleepPet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#E0BF3A",
    padding: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  }
});
