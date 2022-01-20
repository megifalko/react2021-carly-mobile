import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from 'async-storage'
  
function CarListItem({ item }) {
    const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");

    const getImg = async (carId, authToken) => {
        return fetch(`http://10.0.2.2:8080/cars/${carId}/imageIds`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw response;
            }
          });
    }

    useEffect(async() => {
        const token = await AsyncStorage.getItem('@Carly:apiToken');
        getImg(item.id, token)
            .then(data => {
                if(data.length > 0) {
                    setImgSource('http://10.0.2.2:8080/images/' + data[0]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.item}>
            <Text>{item.brand + " " + item.model}</Text>
            <Image
                style={styles.image}
                source={{uri: imgSource}}
            />
        </View>
    )
}

const renderListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <CarListItem item={item}/>
        </TouchableOpacity>
    )
};
  
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 100
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        height: 100,
        backgroundColor: "#AEF359",
        width: "90%",
        flexDirection: "row",
        borderRadius: 5,
    }
});
  
export { renderListItem };