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
import AsyncStorage from "async-storage";

function BookingList({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');
  const [page, setPage] = useState(0);

  const onDelete = (id) => {
    console.log(id);
    deleteSelectedBooking(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.content}>First name: {item.customerFirstName}</Text>
      <Text style={styles.content}>Last name: {item.customerLastName}</Text>
      <Text style={styles.content}>Start date: {item.startDate}</Text>
      <Text style={styles.content}>End date: {item.endDate}</Text>
      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );

  const onRefresh = useCallback(async () => {
    setPage(0);
    setBookings([]);
    loadData(authToken);
  }, [isLoading]);

  const getBookings = async (token, page) => {
    return fetch(`http:/10.0.2.2:8080/bookings?active=true&page=${page}&per_page=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    });
  };

  const deleteBooking = async (token, id) => {
    return fetch(`http:/10.0.2.2:8080/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }).then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw response;
      }
    });
  };

  const loadData = async (token) => {
    setIsLoading(true);
    getBookings(token, 0)
      .then((response) => {
        //console.log(response);
        setBookings(response.data);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        //console.log("yay!");
        setIsLoading(false);
      });
  };

  const appendData = async (token) => {
    setIsLoading(true);
    getBookings(token, page+1)
      .then((response) => {
        //console.log(response);
        setBookings([...bookings, ...response.data]);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        //console.log("yay!");
        setIsLoading(false);
      });
    setPage(page+1)
  };

  const deleteSelectedBooking = async (id) => {
    setIsLoading(true);
    deleteBooking(authToken, id)
      .then((response) => {
        console.log(JSON.stringify(response));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        console.log("yay!");
        loadData(authToken);
      });
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    setAuthToken(token);
    loadData(token);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Booking list:</Text>
      <FlatList
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={bookings}
        renderItem={renderItem}
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
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    height: 300,
    backgroundColor: "#AEF359",
    width: "90%",
    borderRadius: 5,
  },
});

export { BookingList };
