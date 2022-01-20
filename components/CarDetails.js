import { Text, View, StyleSheet } from "react-native";

function CarDetails({ route, navigation }) {
  const item = route.params.item;
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Brand: {item.brand}</Text>
      <Text style={styles.content}>Model: {item.model}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { CarDetails };
