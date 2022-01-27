import { View, FlatList, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "async-storage";
import { getBookings } from "../logic/api";
import styles from "../styles/BookingList.module.css";
import { renderListItem } from "./BookingListItem";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [page, setPage] = useState(0);

  const onRefresh = useCallback(async () => {
    setPage(0);
    setBookings([]);
    loadData(authToken);
  }, [isLoading]);

  const loadData = async (token) => {
    setIsLoading(true);
    getBookings(token, 0)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const appendData = async (token) => {
    setIsLoading(true);
    getBookings(token, page + 1)
      .then((response) => {
        setBookings([...bookings, ...response.data]);
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

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={bookings}
        renderItem={({ item }) =>
          renderListItem({ item, onRefresh, setIsLoading })
        }
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        onEndReached={() => appendData(authToken)}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export { BookingList };
