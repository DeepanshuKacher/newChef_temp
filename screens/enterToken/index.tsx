import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { storeLocalStorageData } from "../../useFullItems/localStorage";
import { axiosGetFunction } from "../../useFullItems/axios";
import { Table } from "../../useFullItems/redux-store/slices/restaurant";
import { constants } from "../../useFullItems/constants";
import { reloadAsync } from "expo-updates";

const EnterToken = () => {
  const [tokenState, setTokenState] = useState<"valid" | "invalid">();
  const [tokenKey, setTokenKey] = useState("");
  const [blockButton, setBlockButton] = useState(false);

  const checkToken = () => {
    setBlockButton(true);
    axios
      .get(`chefs/${tokenKey}`)
      .then(async (response) => {
        const axiosData: {
          accessToken: string;
          selfDetail: {
            name: string;
            id: string;
          };
          restaurantDetail: {
            id: string;
            name: string;
            city: string;
            tables: Table[];
            dishesh: {
              id: string;
              name: string;
            }[];
          };
        } = response?.data;

        const { city, dishesh, id, name, tables } = axiosData.restaurantDetail;
        const temp = dishesh;
        const dishObj: { [id: string]: string } = {};
        for (let x of temp) {
          dishObj[x.id] = x.name;
        }
        await storeLocalStorageData(axiosData?.accessToken, "accessId");
        await storeLocalStorageData(
          {
            id,
            name: name,
            city: city,
            tables: tables,
            dishesh: dishObj,
          },
          "restaurantDetail"
        );
        await storeLocalStorageData(axiosData.selfDetail, "selfDetail");
        await reloadAsync();
      })
      .catch((error: AxiosError) => {
        console.log(error);
        Alert.alert("Check Token error", error.code);
        setTokenState("invalid");
      })
      .finally(() => {
        setBlockButton(false);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        mode="outlined"
        style={{ margin: 8 }}
        label="Enter Token"
        placeholder="Enter Token"
        value={tokenKey}
        onChangeText={setTokenKey}
        left={<TextInput.Icon icon="key" />}
        // right={<TextInput.Affix text="/10" />}
      />
      <Button
        mode="contained-tonal"
        onPress={checkToken}
        disabled={blockButton}
        style={{ marginVertical: 4, marginLeft: 10, width: "30%" }}
      >
        Submit
      </Button>
      {tokenState === "invalid" && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: "red" }}
        >
          Invalid Token or Expired
        </Text>
      )}
      {tokenState === "valid" && (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: "green" }}
        >
          Success reloading app
        </Text>
      )}
    </View>
  );
};

export default EnterToken;
