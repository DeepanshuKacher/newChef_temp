import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKeys = {
  accessId: "accessId",
  restaurantDetail: "restaurantDetail",
  selfDetail: "selfDetail",
  latestCommitUUID: "latestCommitUUID",
};

export const storeLocalStorageData = async (
  storeData: any,
  storeKey: keyof typeof storageKeys
) => {
  const tempData = JSON.stringify(storeData);
  await AsyncStorage.setItem(storeKey, tempData);
  try {
  } catch (error) {
    alert("there is an error");
    console.log(error);
  }
};

export const getLocalStorageData = async (
  valueKey: keyof typeof storageKeys
) => {
  try {
    const jsonValue = await AsyncStorage.getItem(valueKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    alert("there is an error");
    console.log(error);
  }
};
