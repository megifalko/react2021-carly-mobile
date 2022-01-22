import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "async-storage";
// "active": true,
//   "brand": "Toyota",
//   "endDate": "2095-07-19T22:00:00",
//   "engine": "diesel",
//   "id": 8,
//   "location": "Warsaw",
//   "model": "Revolver",
//   "price": 3937,
//   "startDate": "2015-10-07T22:00:00",
//   "year": 2015,

function CarDetails({ route, navigation }) {
  const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");
  const item = route.params.item;
  console.log(item);

  const getImg = async (carId, authToken) => {
    return fetch(`http://10.0.2.2:8080/cars/${carId}/imageIds`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    });
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    getImg(item.id, token)
      .then((data) => {
        if (data.length > 0) {
          setImgSource("http://10.0.2.2:8080/images/" + data[0]);
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
