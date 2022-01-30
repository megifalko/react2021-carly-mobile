import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from 'async-storage'
import { getImage, BASE_URL } from '../logic/api'
import styles from '../styles/CarListItem.module.css'
  
function CarListItem({ item }) {
    const [imgSource, setImgSource] = useState("https://www.downloadclipart.net/large/car-png-photos.png");

    useEffect(async() => {
        const token = await AsyncStorage.getItem('@Carly:apiToken');
        getImage(item.id, token)
            .then(data => {
                if(data.length > 0) {
                    setImgSource(BASE_URL + '/images/' + data[0]);
                }
            })
            .catch(err => console.error(JSON.stringify(err)));
        return () => { // suppress warning
            setImgSource(''); 
        };
    }, []);

    return (
        <View style={styles.item}>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.model}>{item.model}</Text>
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
  
export { renderListItem };