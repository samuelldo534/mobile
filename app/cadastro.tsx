import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#E0BF3A',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
    width: '80%',
  },
});

const Cadastro = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (inputValue.trim() === "") {
      // Exibe uma mensagem de alerta se o nome estiver vazio
      Alert.alert("Erro", "Por favor, insira o nome do Tamagotchi.");
    } else {
      // Navega para a próxima tela
      router.push("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do tamagotchi"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <Button title="CONTINUAR" onPress={handleContinue} />
    </View>
  );
}

export default Cadastro;
