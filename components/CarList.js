import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from 'async-storage'
import { renderListItem } from './CarListItem'

function CarList({ navigation }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');
  const [page, setPage] = useState(0);

  const onPress = (item) => {
    navigation.navigate("CarDetailsScreen", { item });
  };

  const onRefresh = useCallback(async () => {
    setCars([]);
    setPage(0);
    loadData(authToken);
  }, [isLoading]);

  const getCars = async (token, page) => {
    return fetch(`http:/10.0.2.2:8080/cars?page=${page}&per_page=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    });
  };

  const loadData = async (token) => {
    setIsLoading(true);
    getCars(token, 0)
      .then((response) => {
        //console.log(response);
        setCars(response.data);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        //console.log("yay!");
        setIsLoading(false);
      });
  };

  const appendData = async (token) => {
    setIsLoading(true);
    getCars(token, page+1)
      .then((response) => {
        //console.log(response);
        setCars([...cars, ...response.data]);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        //console.log("yay!");
        setIsLoading(false);
      });
    setPage(page+1);
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem('@Carly:apiToken');
    setAuthToken(token);
    loadData(token);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Car list:</Text>
      <FlatList
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={cars}
        renderItem={({item}) => renderListItem({item, onPress})}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        onEndReached={() => appendData(authToken)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  content: {
    margin: 20,
    fontSize: 18,
    alignSelf: "center",
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    height: 60,
    backgroundColor: "#AEF359",
    width: "90%",
    flexDirection: "row",
    borderRadius: 5,
  }
});

export { CarList };
