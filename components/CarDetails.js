import {
  Text,
  View,
  StyleSheet,
  Image,
  LogBox,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "async-storage";
import { getImage, BASE_URL } from "../logic/api";
import Gallery from "react-native-image-gallery";
import Carousel, { Pagination } from "react-native-snap-carousel";

function CarDetails({ route, navigation }) {
  //const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");
  const [imgSources, setImgSources] = useState([]);
  const item = route.params.item;
  console.log(item);

  useEffect(async () => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    getImage(item.id, token)
      .then((data) => {
        if (data.length > 0) {
          let list = [];
          data.forEach((item) => {
            list.push("http://10.0.2.2:8080/images/" + item);
            console.log(item);
          });
          console.log(list);
          setImgSources(list);
          //setImgSource("http://10.0.2.2:8080/images/" + data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  //{ id: '1', image: IMAGES.image1 }
  const imageList = imgSources.map((image) => {
    console.log({ id: "image", image: image });
    return { id: "image", image: image };
  });
  const { width } = Dimensions.get("window");
  console.log(imageList);
  return (
    <View style={styles.container}>
      <Carousel
          data={imageList}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'
              source={{ uri: item.image }}
            />
          )}
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
