import { ActivityIndicator, MD2Colors } from "react-native-paper";

function Loader() {
  return (
    <ActivityIndicator
      size="large"
      animating={true}
      style={{ backgroundColor: "black", flex: 1 }}
      color={MD2Colors.white}
    />
  );
}

export default Loader;
