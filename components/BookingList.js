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
  
  function BookingList({ navigation }) {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text>{title}</Text>
      </View>
    );
  
    const renderItem = ({ item }) => (
        <Item title={"item"} />
    );
  
    const onRefresh = useCallback(async () => {
      setBookings([]);
      setIsLoading(true);
      loadData();
    }, [isLoading]);
  
    const getBookings = async (token) => {
      return fetch(`http:/10.0.2.2:8080/bookings`, {
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
  
    const loadData = async () => {
      const token = await AsyncStorage.getItem('@Carly:apiToken');
  
      getBookings(token)
        .then((response) => {
          console.log(response);
          setBookings(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          console.log("yay!");
          setIsLoading(false);
        });
    };
  
    useEffect(async () => {
      loadData();
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
  
  export { BookingList };
  