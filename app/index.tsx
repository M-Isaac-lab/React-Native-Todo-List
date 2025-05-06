import {StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";

export default function Index() {
  return (
      <>
          <SafeAreaView style={styles.container}>
            <ThemedText variant="headline">Pokédex</ThemedText>
            <Link href='/to_do_list/To_do_list'>To do list</Link>
          </SafeAreaView>
          </>
  );
}


const styles = StyleSheet.create({
    container: {backgroundColor : '#F12'}
})