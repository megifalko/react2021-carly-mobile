import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "async-storage";
import { getBookings, deleteBooking } from "../logic/api";
import styles from "../styles/BookingList.module.css";

function BookingList({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [page, setPage] = useState(0);

  const onDelete = (id) => {
    console.log(id);
    deleteSelectedBooking(id);
  };
  const { width, height } = Dimensions.get("window");
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1 / 2,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.content}>Booked by:</Text>
          </View>
          <View
            style={{
              flex: 1 / 2,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.header}>
              {item.customerFirstName + " " + item.customerLastName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1 / 2,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.content}>From:</Text>
          </View>
          <View
            style={{
              flex: 1 / 2,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.header}>
            {(new Date(Date.parse(item.startDate))).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1 / 2,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.content}>To:</Text>
          </View>
          <View
            style={{
              flex: 1 / 2,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.header}>
            {item.endDate ? (new Date(Date.parse(item.endDate))).toLocaleDateString() : "-"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        title="Delete"
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles["button-text"]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const onRefresh = useCallback(async () => {
    setPage(0);
    setBookings([]);
    loadData(authToken);
  }, [isLoading]);

  const loadData = async (token) => {
    setIsLoading(true);
    getBookings(token, 0)
      .then((response) => {
        console.log(response);
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
    getBookings(token, page + 1)
      .then((response) => {
        //console.log(response);
        setBookings([...bookings, ...response.data]);
      })
      .catch((err) => console.error(JSON.stringify(err)))
      .finally(() => {
        //console.log("yay!");
        setIsLoading(false);
      });
    setPage(page + 1);
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        onEndReached={() => appendData(authToken)}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export { BookingList };
