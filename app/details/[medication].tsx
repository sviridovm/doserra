import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


export default function DetailsScreen() {
    const { medication } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Details of {medication}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
