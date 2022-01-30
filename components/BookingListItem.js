import { Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { getImage, BASE_URL } from "../logic/api";
import AsyncStorage from "async-storage";
import { deleteBooking } from "../logic/api";
import styles from "../styles/BookingList.module.css";

function BookingListItem({ item, onRefresh, setIsLoading }) {
  const [authToken, setAuthToken] = useState("");
  const [imgSource, setImgSource] = useState(
    "https://www.downloadclipart.net/large/car-png-photos.png"
  );

  useEffect(async () => {
    const token = await AsyncStorage.getItem("@Carly:apiToken");
    setAuthToken(token);
    getImage(item.carId, token)
      .then((data) => {
        if (data.length > 0) {
          setImgSource(BASE_URL + "/images/" + data[0]);
        }
      })
      .catch((err) => console.error(JSON.stringify(err)));
    return () => { // suppress warning
      setImgSource(''); 
    };
  }, []);

  const onDelete = async (id) => {
    await deleteSelectedBooking(id);
    onRefresh();
  };

  const deleteSelectedBooking = async (id) => {
    setIsLoading(true);
    deleteBooking(authToken, id)
      .then((response) => {
        console.log(JSON.stringify(response));
      })
      .catch((err) => console.error(JSON.stringify(err)));
  };

  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: imgSource }} />
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
              {item.customerFirstName }
            </Text>
            <Text style={styles.header}>
              {item.customerLastName }
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
              flex: 1 / 3,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.content}>From:</Text>
          </View>
          <View
            style={{
              flex: 2 / 3,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.header}>
              {item.startDate.substring(0, item.startDate.indexOf("T"))}
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
              flex: 1 / 3,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.content}>To:</Text>
          </View>
          <View
            style={{
              flex: 2 / 3,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.header}>
              {item.endDate
                ? item.endDate.substring(0, item.startDate.indexOf("T"))
                : "-"}
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
}

const renderListItem = ({ item, onRefresh, setIsLoading }) => {
  return (
    <BookingListItem
      item={item}
      onRefresh={onRefresh}
      setIsLoading={setIsLoading}
    />
  );
};

export { renderListItem };
