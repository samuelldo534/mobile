import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface TamagotchiParams {
  name: string;
  image: any;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#E0BF3A",
    padding: 20,
  },
  tamagotchiImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tamagotchiName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  attribute: {
    fontSize: 18,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 20,
  },
  deadText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
});

const InicioScreen: React.FC = () => {
  const { name, image } = useLocalSearchParams<TamagotchiParams>();
  const [hunger, setHunger] = useState<number>(50);
  const [sleep, setSleep] = useState<number>(50);
  const [fun, setFun] = useState<number>(50);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [isDead, setIsDead] = useState<boolean>(false); // Estado para controlar se o Tamagotchi está morto
  const navigation = useNavigation();

  // Função para calcular o status com base na soma dos atributos
  const calculateStatus = () => {
    const totalAttributes = hunger + sleep + fun;
    if (totalAttributes === 0) {
      return 'morto';
    } else if (totalAttributes >= 1 && totalAttributes <= 50) {
      return 'crítico';
    } else if (totalAttributes >= 51 && totalAttributes <= 100) {
      return 'muito triste';
    } else if (totalAttributes >= 101 && totalAttributes <= 150) {
      return 'triste';
    } else if (totalAttributes >= 151 && totalAttributes <= 200) {
      return 'ok';
    } else if (totalAttributes >= 201 && totalAttributes <= 250) {
      return 'bem';
    } else {
      return 'muito bem';
    }
  };

  // Função para verificar se o Tamagotchi morreu
  useEffect(() => {
    if (hunger === 0 && sleep === 0 && fun === 0) {
      setIsDead(true); // Quando os três atributos estão zerados, o Tamagotchi morre
    }
  }, [hunger, sleep, fun]);

  useEffect(() => {
    let sleepInterval: NodeJS.Timeout | undefined;
    let awakeInterval: NodeJS.Timeout | undefined;

    if (isSleeping && !isDead) {
      sleepInterval = setInterval(() => {
        setSleep(prev => Math.min(prev + 1, 100));
      }, 1000);
    } else if (!isSleeping && !isDead) {
      awakeInterval = setInterval(() => {
        setSleep(prev => Math.max(prev - 1, 0));
        setHunger(prev => Math.max(prev - 1, 0));
        setFun(prev => Math.max(prev - 1, 0)); // Diversão diminui enquanto está acordado
      }, 3000);
    }

    return () => {
      if (sleepInterval) clearInterval(sleepInterval);
      if (awakeInterval) clearInterval(awakeInterval);
    };
  }, [isSleeping, isDead]);

  const handleNewTamagotchi = () => {
    navigation.replace('cadastro'); // Navega para a tela de cadastro
  };

  const feedTamagotchi = () => {
    if (isSleeping) {
      Alert.alert(`Acorde o ${name} primeiro!`);
    } else {
      setHunger(prev => Math.min(prev + 10, 100));
    }
  };

  const putTamagotchiToSleep = () => {
    setIsSleeping(true);
  };

  const wakeUpTamagotchi = () => {
    setIsSleeping(false);
  };

  const playWithTamagotchi = () => {
    if (isSleeping) {
      Alert.alert(`Acorde o ${name} primeiro!`);
    } else if (hunger === 0) {
      Alert.alert(`Alimente o ${name} primeiro!`);
    } else if (sleep === 0) {
      Alert.alert(`Deixe o ${name} descansar primeiro!`);
    } else {
      setFun(prev => Math.min(prev + 10, 100)); // Aumenta a diversão ao brincar
      navigation.navigate('brincar'); // Leva para a tela de diversão (minigames)
    }
  };

  return (
    <View style={styles.container}>
      {isDead ? (
        <>
          <Text style={styles.deadText}>Oh não, O {name} não está mais entre nós!</Text>
          <Button title="Cadastrar Novo Tamagotchi" onPress={handleNewTamagotchi} />
        </>
      ) : (
        <>
          <Text style={styles.tamagotchiName}>{name}</Text>
          {image ? (
            <Image source={image} style={styles.tamagotchiImage} />
          ) : (
            <Text style={styles.tamagotchiName}>Imagem não disponível</Text>
          )}

          <Text style={styles.attribute}>Fome: {hunger}</Text>
          <Text style={styles.attribute}>Sono: {sleep}</Text>
          <Text style={styles.attribute}>Diversão: {fun}</Text>
          <Text style={styles.statusText}>Status: {calculateStatus()}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={isSleeping ? wakeUpTamagotchi : putTamagotchiToSleep}
            >
              <Text style={styles.buttonText}>{isSleeping ? 'Acordar' : 'Dormir'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={feedTamagotchi}
            >
              <Text style={styles.buttonText}>Alimentar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={playWithTamagotchi}
            >
              <Text style={styles.buttonText}>Brincar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default InicioScreen;
