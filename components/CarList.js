import { Text, View, Button, StyleSheet } from 'react-native';
import {useEffect} from 'react'
import AsyncStorage from 'async-storage'

function CarList({navigation}) {
  const getCars = async (token) => {
    return fetch(`http:/10.0.2.2:8080/cars`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    }) 
  }

  useEffect(async () => {
    const token = await AsyncStorage.getItem('@Carly:apiToken');

    getCars(token)
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err.status))
      .finally(() => console.log('yay xd!'));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>This is a MASTER screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('CarDetailsScreen')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    margin: 20,
    fontSize: 18,
  }
});

export {
  CarList
}