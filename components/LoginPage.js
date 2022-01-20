import { Text, View, Button, StyleSheet, TextInput} from 'react-native';
import {useEffect, useState} from 'react'
import AsyncStorage from 'async-storage'

function LoginPage({navigation}) {
  const login = async (username, password) => {
    return fetch(`http:/10.0.2.2:8080/authenticate`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response;
        }
    })
  }

  const saveToken = async (token) => {
        return AsyncStorage.setItem(
          '@Carly:apiToken',
          token
        );
  }

  /*useEffect(async () => {
    test()
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err.status))
      .finally(() => console.log('yay xd!'));
  }, []);*/

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title="Login"
        onPress={() => {
            login(username, password)
                .then(response => {
                    console.log(response.jwttoken)
                    saveToken(response.jwttoken)
                        .then(() => navigation.navigate('Home'))
                })
                .catch(err => console.error(err));
        }}
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
  },
  input: {
      width: 100,
      borderWidth: 1
  }
});

export {
  LoginPage
}