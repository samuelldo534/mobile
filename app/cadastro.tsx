import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Alert, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { tamaServ } from './database/tamaServ';

// Imagens disponíveis para seleção
const images = [
  { id: 1, uri: require('./assets/cat (1).png') },
  { id: 2, uri: require('./assets/dog.png') },
];

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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImage: {
    borderColor: 'blue',
  },
});







const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const router = useRouter();
  const{createTama}=tamaServ();

  const create = async ()=>{
  try{
   
    const res=await createTama({nome:nome,imagem:imagem})
  }catch(error){}

  }

  const handleContinue = () => {

    if (nome.trim() === "") {
      Alert.alert("Erro", "Por favor, insira o nome do Tamagotchi.");
    } else if (!imagem) {
      Alert.alert("Erro", "Por favor, selecione uma imagem.");
    } else {
      router.push({
        pathname: '/(tabs)', 
        params: {
          name: inputValue,
          image: selectedImage,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Tamagotchi"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      
      <View style={styles.imageContainer}>
        {images.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => setImagem(image.uri)}
          >
            <Image
              source={image.uri}
              style={[
                styles.image,
                selectedImage === image.uri && styles.selectedImage,
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <Button title="CONTINUAR" onPress={continuar} />
    </View>
  );
};

export default Cadastro;
