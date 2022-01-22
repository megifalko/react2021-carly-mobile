import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from 'async-storage'
import { renderListItem } from './CarListItem'
import { getCars } from '../logic/api'

function CarList({ navigation }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');

  const onPress = (item) => {
    navigation.navigate("CarDetailsScreen", { item });
  };

  const onRefresh = useCallback(async () => {
    setCars([]);
    setPage(0);
    loadData(authToken, searchText);
  }, [isLoading]);

  const loadData = async (token, searchText) => {
    setIsLoading(true);
    getCars(token, 0, searchText != undefined && searchText.length >= 3 ? searchText : undefined)
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

  const appendData = async (token, searchText) => {
    setIsLoading(true);
    getCars(token, page+1, searchText != undefined && searchText.length >= 3 ? searchText : undefined)
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

  const onSearchInput = (value) => {
    setSearchText(value);
    if(value.length > 3 || value === '') onRefresh();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onSearchInput}
        value={searchText}
        placeholder="Search for a car"
      />
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
        onEndReached={() => appendData(authToken, searchText)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center"
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
  },
  input: {
    width: 200,
    borderWidth: 1
  }
});

export { CarList };
