import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useAppSelector } from "../useFullItems/redux-store";

function GlobalLoader() {
  const showActivityIndicator = useAppSelector(
    (store) => store.globalLoader.defaultValues
  );
  return (
    <ActivityIndicator
      // animating={true}
      size="large"
      color={MD2Colors.white}
      style={{
        backgroundColor: "#000000a6",
        zIndex: 5,
        position: "absolute",
        height: "100%",
        width: "100%",
        display: showActivityIndicator ? "flex" : "none",
      }}
    />
  );
}

export default GlobalLoader;
