import { View, TouchableOpacity, Text, TextInput} from 'react-native';
import {useEffect, useState} from 'react'
import AsyncStorage from 'async-storage'
import styles from '../styles/LoginPage.module.css'
import Ionicons from "react-native-vector-icons/Ionicons";
import { login } from '../logic/api'

function LoginPage({navigation}) {
  const saveToken = async (token) => {
        return AsyncStorage.setItem(
          '@Carly:apiToken',
          token
        );
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Ionicons size={60} name="car"/>
      <Text style={styles.title}>Carly</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder="password"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            login(username, password)
                .then(response => {
                    saveToken(response.jwttoken)
                        .then(() => navigation.navigate('Home'))
                })
                .catch(err => console.error(JSON.stringify(err)));
        }}
      >
        <Text style={styles['login-text']}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export {
  LoginPage
}