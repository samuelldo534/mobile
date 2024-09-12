import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'expo-router';


const styles = StyleSheet.create({
    container:{
    
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        backgroundColor:'#E0563A',
        

    },
    text:{
        marginBottom:100,
        color: '#ffffF',
        fontSize:50
    }
    })
const index = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TAMAGOCHI</Text>
            <Button title="INICIAR" onPress={() => router.push("/cadastro")}></Button>
        </View>
    );
}

export default index;