import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "async-storage";
import { renderListItem } from "./CarListItem";
import { getCars } from "../logic/api";
import styles from "../styles/CarList.module.css";
import Ionicons from "react-native-vector-icons/Ionicons";

function CarList({ navigation }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");

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
    getCars(
      token,
      0,
      searchText != undefined && searchText.length >= 3 ? searchText : undefined
    )
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const appendData = async (token, searchText) => {
    setIsLoading(true);
    getCars(
      token,
      page + 1,
      searchText != undefined && searchText.length >= 3 ? searchText : undefined
    )
      .then((response) => {
        setCars([...cars, ...response.data]);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        setIsLoading(false);
      });
    setPage(page + 1);
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    setAuthToken(token);
    loadData(token);
  }, []);

  const onSearchInput = (value) => {
    setSearchText(value);
    if (value.length > 3 || value === "") onRefresh();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onSearchInput}
        value={searchText}
        placeholder="Search for a car"
      />
      <Ionicons name="search" style={styles["search-icon"]} />
      <FlatList
        contentContainerStyle={styles.list}
        style={{ flex: 1, width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={cars}
        renderItem={({ item }) => renderListItem({ item, onPress })}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        onEndReached={() => appendData(authToken, searchText)}
      />
    </View>
  );
}

export { CarList };
