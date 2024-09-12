import { StyleSheet, View } from "react-native";

const styles= StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    backgroundColor:"#E0BF3A"
  }


})
const dormir = () => {
  return (
    <View style={styles.container}></View>
  );
}

export default dormir;