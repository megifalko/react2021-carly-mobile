
import { Text, View, StyleSheet } from 'react-native';

function CarDetails() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>This is a DETAIL screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    content: {
        margin: 20,
        fontSize: 18,
    }
});

export {
    CarDetails
}