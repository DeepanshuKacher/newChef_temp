import { View, Alert, StyleSheet } from "react-native";
import { Text, List } from "react-native-paper";
import ScreenWrapper from "../../ScreenWrapper";
import { RootTabScreenProps } from "../../types";
import { useAppSelector } from "../../useFullItems/redux-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAsync } from "expo-updates";

function Setting({ navigation }: { navigation: any }) {
  const { city: restaurantCity, name: restaurantName } = useAppSelector(
    (store) => store.restaurantInfoSlice.defaultValues
  );

  const selfInfo = useAppSelector((store) => store.selfInfo.defaultValues);

  console.log({ selfInfo });

  return (
    <ScreenWrapper style={{ borderWidth: 2 }}>
      <View style={{ borderBottomWidth: 1.5, paddingVertical: 10 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {selfInfo?.name}
        </Text>
        <Text style={{ textAlign: "center" }} variant="titleMedium">
          {restaurantName}
        </Text>
        <Text style={{ textAlign: "center" }} variant="titleMedium">
          {restaurantCity}
        </Text>
      </View>
      <List.Item
        onPress={() => navigation.navigate("Logs")}
        title={() => <Text style={{ fontSize: 20 }}>Logs</Text>}
      />
      <List.Item
        onPress={() =>
          Alert.alert("Are you sure to reset", undefined, [
            {
              text: "Reset",
              onPress: async () => {
                await AsyncStorage.clear();
                await reloadAsync();
              },
            },
            {
              text: "Cancel",
            },
          ])
        }
        title={() => <Text style={{ fontSize: 20 }}>Reset</Text>}
      />
      <List.Item title="Headline" description="Supporting text" />
      <List.Item
        title="Headline"
        description="Supporting text that is long enough to fill up multiple lines in the item"
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  testStyle: {
    // borderWidth: 2,
    paddingLeft: 10,
    // marginBottom: 6,
    borderWidth: 1,
  },
});

export default Setting;
