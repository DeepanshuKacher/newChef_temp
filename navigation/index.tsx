import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Order from "../screens/order";
import OnGoingOrder from "../screens/onGoindOrders";
import Setting from "../screens/setting";
import { Logs } from "../screens/logs";
import { useAppSelector } from "../useFullItems/redux-store";
// import { RootStackParamList, RootTabParamList } from "../types/navigation";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const ordersLength = useAppSelector(
    (store) => store?.orderContainer?.orders
  )?.filter((kot) => !kot?.value?.chefAssign && !kot.value.completed).length;

  const selfInfo = useAppSelector((store) => store.selfInfo.defaultValues);

  const preparingOrderLength = useAppSelector(
    (store) => store.orderContainer.orders
  )?.filter(
    (order) => order.value.chefAssign === selfInfo?.id && !order.value.completed
  ).length;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/order.png")}
            />
          ),
          tabBarBadge: ordersLength > 0 ? ordersLength : undefined,
        }}
      />
      <Tab.Screen
        name="Accepted"
        component={OnGoingOrder}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/accepted_order.png")}
            />
          ),
          tabBarBadge:
            preparingOrderLength > 0 ? preparingOrderLength : undefined,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/setting.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const StackNavigationStack = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomNavigation} />
      <Stack.Group>
        <Stack.Screen
          name="Logs"
          component={Logs}
          options={{ headerShown: true, animation: "none" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
);
