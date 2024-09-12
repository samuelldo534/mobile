import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

export default function SleepScreen() {
  const [sleep, setSleep] = useState(100);

  const sleepPet = () => {
    if (sleep < 100) {
      setSleep(sleep + 10); // Dormir aumenta o sono
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sono: {sleep}</Text>
      <Button title="Dormir" onPress={sleepPet} />
    </View>
  );
}
