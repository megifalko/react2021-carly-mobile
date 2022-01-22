import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from 'async-storage'
import { getImage, BASE_URL } from '../logic/api'
  
function CarListItem({ item }) {
    const [imgSource, setImgSource] = useState("https://placekitten.com/300/200");

    useEffect(async() => {
        const token = await AsyncStorage.getItem('@Carly:apiToken');
        getImage(item.id, token)
            .then(data => {
                if(data.length > 0) {
                    setImgSource(BASE_URL + '/images/' + data[0]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.item}>
            <Text>{item.id + " " + item.brand + " " + item.model}</Text>
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