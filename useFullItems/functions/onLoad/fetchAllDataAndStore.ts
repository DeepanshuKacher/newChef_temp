import axios from "axios";
import { axiosGetFunction } from "../../axios";
import { Alert } from "react-native";
import { storeLocalStorageData } from "../../localStorage";
import { constants } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAsync } from "expo-updates";
import { Dish, Table } from "../../redux-store/slices/restaurant";

export const fetchAllDataAndStore = async (latestCommitID: string) => {
  const responseData: {
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
  } = await axiosGetFunction({
    parentUrl: "chefs",
    childUrl: "restaurantDetail",
  });

  if (responseData === undefined) {
    return Alert.alert("Some server problem");
  }

  if (responseData?.selfDetail?.name === "clear") {
    await AsyncStorage.clear();
    await reloadAsync();
  }

  const { city, dishesh, id, name, tables } = responseData.restaurantDetail;
  const temp = dishesh;
  const dishObj: { [id: string]: string } = {};
  for (let x of temp) {
    dishObj[x.id] = x.name;
  }
  const storeRestaurantDetailPromis = storeLocalStorageData(
    {
      id,
      name: name,
      city: city,
      tables: tables,
      dishesh: dishObj,
    },
    "restaurantDetail"
  );
  const storeSelfDetailPromis = storeLocalStorageData(
    responseData.selfDetail,
    "selfDetail"
  );

  const updateCommitIdPromis = storeLocalStorageData(
    latestCommitID,
    "latestCommitUUID"
  );

  await Promise.all([
    storeRestaurantDetailPromis,
    storeSelfDetailPromis,
    updateCommitIdPromis,
  ]).catch((error) => {
    if (constants.IS_DEVELOPMENT) console.log(error);
    Alert.alert("Some internal error");
  });

  if (constants.IS_DEVELOPMENT) console.log("new update found");
  await reloadAsync();
};
