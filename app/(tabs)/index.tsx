import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface TamagotchiParams {
  name: string; // Nome do Tamagotchi
  image: any; // Tipo da imagem (pode ser requer uma definição mais específica dependendo de como você lida com as imagens)
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
    width: '100%', // Faz os botões ocuparem a largura total disponível
  },
  button: {
    backgroundColor: '#4CAF50', // Cor de fundo do botão
    padding: 10,
    borderRadius: 5,
    width: 100, // Largura dos botões
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const InicioScreen: React.FC = () => {
  const { name, image } = useLocalSearchParams<TamagotchiParams>();
  const [hunger, setHunger] = useState<number>(50);
  const [sleep, setSleep] = useState<number>(50);
  const [isSleeping, setIsSleeping] = useState<boolean>(false); 
  const navigation = useNavigation();

  useEffect(() => {
    let sleepInterval: NodeJS.Timeout | undefined;
    let awakeInterval: NodeJS.Timeout | undefined;
    let hungerInterval: NodeJS.Timeout | undefined;

    // Aumenta o sono enquanto está dormindo
    if (isSleeping) {
      sleepInterval = setInterval(() => {
        setSleep(prev => {
          if (prev < 100) {
            return Math.min(prev + 1, 100);
          }
          return prev;
        });
      }, 1000);
    } else {
      // Diminui o sono enquanto está acordado
      awakeInterval = setInterval(() => {
        setSleep(prev => {
          if (prev > 0) {
            return Math.max(prev - 1, 0); // Diminui o sono em 1, até o mínimo 0
          }
          return prev;
        });
      }, 1000);

      // Diminui a fome enquanto está acordado
      hungerInterval = setInterval(() => {
        setHunger(prev => {
          if (prev > 0) {
            return Math.max(prev - 1, 0); // Diminui a fome em 1, até o mínimo 0
          }
          return prev;
        });
      }, 3000); // Ajuste o tempo aqui se desejar uma diminuição mais rápida ou lenta
    }

    // Limpa os intervalos quando o componente é desmontado ou o estado muda
    return () => {
      if (sleepInterval) clearInterval(sleepInterval);
      if (awakeInterval) clearInterval(awakeInterval);
      if (hungerInterval) clearInterval(hungerInterval);
    };
  }, [isSleeping]);

  const feedTamagotchi = () => {
    if (isSleeping) {
      Alert.alert(`Acorde o ${name} primeiro!`); // Exibe um alerta se estiver dormindo
    } else {
      setHunger(prev => Math.min(prev + 10, 100));
    }
  };

  const putTamagotchiToSleep = () => {
    setIsSleeping(true); // Coloca o Tamagotchi para dormir
  };

  const wakeUpTamagotchi = () => {
    setIsSleeping(false); // Acorda o Tamagotchi
  };

  const playWithTamagotchi = () => {
    if (isSleeping) {
      Alert.alert(`Acorde o ${name} primeiro!`); // Exibe um alerta se estiver dormindo
    } else if (hunger === 0) {
      Alert.alert(`Alimente o ${name} primeiro!`); // Exibe um alerta se a fome estiver em 0
    } else if (sleep === 0) {
      Alert.alert(`Deixe o ${name} descansar primeiro!`); // Exibe um alerta se o sono estiver em 0
    } else {
      navigation.navigate('brincar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tamagotchiName}>{name}</Text>
      {image ? (
        <Image source={image} style={styles.tamagotchiImage} />
      ) : (
        <Text style={styles.tamagotchiName}>Imagem não disponível</Text>
      )}

      <Text style={styles.attribute}>Fome: {hunger}</Text>
      <Text style={styles.attribute}>Sono: {sleep}</Text>

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
    </View>
  );
};

export default InicioScreen;
