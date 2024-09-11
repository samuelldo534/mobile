import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
    container:{
    
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        backgroundColor:'#06DC1C'

    },
    text:{
        color: '#ffffF'
    }
    })
const index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TAMAGOCHI</Text>
            <Link href={"/(tabs)"} style={styles.text}>CONTINUAR</Link>
        </View>
    );
}

export default index;