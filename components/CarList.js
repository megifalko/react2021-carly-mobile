import { Text, View, Button, StyleSheet } from 'react-native';
import {useEffect} from 'react'

function CarList({navigation}) {
  const test = async () => {
    return fetch(`http:/10.0.2.2:8080/cars`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
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
    test()
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.error(err))
      .finally(() => console.log('yay!'));
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