import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "async-storage";
import { getImage, BASE_URL } from '../logic/api'

function CarDetails({ route, navigation }) {
  const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");
  const item = route.params.item;
  console.log(item);

  useEffect(async () => {
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    getImage(item.id, token)
      .then((data) => {
        if (data.length > 0) {
          setImgSource(BASE_URL + '/images/' + data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imgSource }} />
      <Text style={styles.content}>Brand: {item.brand}</Text>
      <Text style={styles.content}>Model: {item.model}</Text>
      <Text style={styles.content}>Engine: {item.engine}</Text>
      <Text style={styles.content}>Location: {item.location}</Text>
      <Text style={styles.content}>Year: {item.year}</Text>
      <Text style={styles.content}>Price: {item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
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
