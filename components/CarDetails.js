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
import styles from "../styles/CarDetails.module.css";
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
  const { width, height } = Dimensions.get("window");
  console.log(imageList);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 / 4, flexDirection: "row" }}>
        <View style={{ flex: 1 / 2 }}>
          <Text>Brand</Text>
          <Text>{item.brand}</Text>
        </View>
        <View style={{ flex: 1 / 2 }}>
        </View>
      </View>
      <View style={{ flex: 1 / 4, flexDirection: "row" }}>
        <View style={{ flex: 1 / 2 }}>
          <Text>Model</Text>
          <Text>{item.model}</Text>
        </View>
        <View style={{ flex: 1 / 2, alignItems: "flex-end"}}>
          <Text>Year</Text>
          <Text>{item.year}</Text>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
        <Carousel
          style={styles.carousel}
          data={imageList}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={styles.image}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
          )}
        />
      </View>
      <View style={{ flex: 1/2, flexDirection: "row" }}>
        <View style={{ flex: 1 / 2 }}>
        </View>
        <View style={{ flex: 1 / 2, alignItems: "flex-end"}}>
          <Text>Price:     ${item.price}</Text>
          <Text>/day</Text>
        </View>
      </View>
    </View>
  );
}
//alignItems: "flex-end"
export { CarDetails };
