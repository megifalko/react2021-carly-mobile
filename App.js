import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CarList } from "./components/CarList";
import { CarDetails } from "./components/CarDetails";
import { LoginPage } from "./components/LoginPage";
import { BookingList } from "./components/BookingList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const isLoggedIn = true;

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CarListScreen"
        component={CarList}
        options={{
          title: "CarListScreen",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "car-sharp";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        }}
      />

      <Tab.Screen
        name="BookingListScreen"
        component={BookingList}
        options={{
          title: "BookingListScreen",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "calendar-sharp";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
        <>
          <Stack.Screen
            name="LoginPageScreen"
            component={LoginPage}
            options={{ title: "LoginPageScreen" }}
          />
        </>
        ) : (
        <>
        <Stack.Screen
            name="LoginPageScreen"
            component={LoginPage}
            options={{ title: "LoginPageScreen" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CarListScreen"
            component={CarList}
            options={{ title: "CarListScreen" }}
          />
          <Stack.Screen
            name="CarDetailsScreen"
            component={CarDetails}
            options={{ title: "CarDetailsScreen" }}
          />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    margin: 20,
    fontSize: 18,
  },
});
