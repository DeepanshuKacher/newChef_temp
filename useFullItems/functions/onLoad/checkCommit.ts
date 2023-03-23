import { Alert } from "react-native";
import { axiosGetFunction } from "../../axios";
import { constants } from "../../constants";
import { getLocalStorageData } from "../../localStorage";
import { fetchAllDataAndStore } from "./fetchAllDataAndStore";

export const checkCommit = async () => {
  const latestCommitIdPromis = axiosGetFunction({
    parentUrl: "restaurants",
    childUrl: "checkCommit",
  });

  const localCommitIdPromis = getLocalStorageData("latestCommitUUID");

  try {
    const [latestCommitID, localCommitID] = await Promise.all([
      latestCommitIdPromis,
      localCommitIdPromis,
    ]);

    if (constants.IS_DEVELOPMENT)
      console.log({ latestCommitID, localCommitID });

    if (!latestCommitID) return;

    if (latestCommitID !== localCommitID)
      await fetchAllDataAndStore(latestCommitID);
  } catch (error) {
    if (constants.IS_DEVELOPMENT) console.log(error);
    Alert.alert("Some error please restart app");
  }
};
