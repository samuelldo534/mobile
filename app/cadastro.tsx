import { Button, StyleSheet, TextInput, View } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";


const styles = StyleSheet.create({

container:{
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    backgroundColor:'#E0BF3A',

},
input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor:"#ffffff",
    width: '80%', 
  },



})






const cadastro = () => {
    const[inputValue,setInputValue,]=useState("")

    const router = useRouter();
    return (
        <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Digite o nome do tamagotchi" value={inputValue} onChangeText={text =>setInputValue(text)}></TextInput>
        <Button   title="CONTINUAR" onPress={() => router.push("/(tabs)")} ></Button>
        </View>
    );
}

export default cadastro;