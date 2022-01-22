import { Text, View, StyleSheet, Image, LogBox } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "async-storage";
import { getImage, BASE_URL } from '../logic/api'
import Gallery from 'react-native-image-gallery';

function CarDetails({ route, navigation }) {
  //const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");
  const [imgSources, setImgSources] = useState([]);
  const item = route.params.item;
  console.log(item);

  useEffect(async () => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    getImage(item.id, token)
      .then((data) => {
        if (data.length > 0) {
          let list = [];
          data.forEach((item) => {
            list.push("http://10.0.2.2:8080/images/"+item);
            console.log(item);
          })
          console.log(list)
          setImgSources(list);
          //setImgSource("http://10.0.2.2:8080/images/" + data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const imageList = imgSources.map((image) =>{
    return({ source: { uri: image }, dimensions: { width: 150, height: 150 }  });
  })

  return (
    <View style={styles.container}>
      <Gallery
        style={{ flex: 1, backgroundColor: 'transparent', marginTop: 50 }}
        images={imageList}
        useNativeDriver={true}
      />
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
