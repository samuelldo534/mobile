import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FunScreen() {
  // Obtém a navegação sem tipagem explícita
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Jogo de Corrida" onPress={() => navigation.navigate('CaptureGame')} />
      <Button title="Jogo da Memória" onPress={() => navigation.navigate('MemoryGame')} />
    </View>
  );
}
