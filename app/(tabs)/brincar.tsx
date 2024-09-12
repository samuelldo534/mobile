import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FunScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Jogo de Corrida" onPress={() => navigation.navigate('MazeRunner')} />
      <Button title="Jogo da Memória" onPress={() => navigation.navigate('MemoryGame')} />
    </View>
  );
}