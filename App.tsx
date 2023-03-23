import { Alert, StatusBar, StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { action_types, store } from "./useFullItems/redux-store";
import { StackNavigationStack } from "./navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { constants } from "./useFullItems/constants";
import { getLocalStorageData } from "./useFullItems/localStorage";
import { SelfDataType } from "./useFullItems/redux-store/slices/selfDetail";
import { onLoad } from "./useFullItems/functions";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EnterToken from "./screens/enterToken";
import Loader from "./screens/loader";
import GlobalLoader from "./components/globalLoader";
// import { Provider as PaperProvider } from "react-native-paper";
axios.defaults.baseURL = constants.IS_DEVELOPMENT
  ? "http://192.168.43.48:5000/"
  : "https://api.eatrofoods.com/";

export default function App() {
  const [appStartState, setAppStartState] = useState<
    "loading" | "start" | "token"
  >("loading");

  useEffect(() => {
    Alert.alert(`is_development ${constants.IS_DEVELOPMENT}`);
    (async () => {
      const accessToken = await getLocalStorageData("accessId");
      const restaurantDetail = await getLocalStorageData("restaurantDetail");
      const selfInfo: SelfDataType = await getLocalStorageData("selfDetail");
      if (accessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        if (restaurantDetail)
          store.dispatch(action_types.updateRestaurantInfo(restaurantDetail));
        if (selfInfo) store.dispatch(action_types.loadSelfData(selfInfo));

        await onLoad(restaurantDetail.id);

        setAppStartState("start");
      } else {
        setAppStartState("token");
      }
    })();
  }, []);

  if (appStartState === "start")
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor="black" />
        <ReduxProvider store={store}>
          <GlobalLoader />
          <StackNavigationStack />
        </ReduxProvider>
      </SafeAreaProvider>
    );
  else if (appStartState === "token") return <EnterToken />;
  else return <Loader />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
