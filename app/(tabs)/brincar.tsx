import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FunScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um Jogo</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Jogo de Corrida"
          color="#4CAF50" // Cor personalizada do botão
          onPress={() => navigation.navigate('MazeRunner')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Jogo da Memória"
          color="#2196F3" // Outra cor para o segundo botão
          onPress={() => navigation.navigate('MemoryGame')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Cor de fundo clara
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // Cor do texto
  },
  buttonContainer: {
    marginBottom: 20, // Espaçamento entre os botões
    width: '80%', // Largura dos botões
  },
});
