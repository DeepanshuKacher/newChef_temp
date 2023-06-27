import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, DataTable, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  action_types,
  useAppSelector,
  useAppDispatch,
} from "../../useFullItems/redux-store";
import type { Order as DishOrderType, Order } from "./redux";
import {
  Kot,
  fetchAndStoreKot,
  fetchAndStoreOrders,
} from "../../useFullItems/functions/onLoad/fetchAndStoreFunctions";
import { Fragment, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { constants } from "../../useFullItems/constants";
import { axiosPatchFunction } from "../../useFullItems/axios";
// import { useToast } from "react-native-toast-notifications";

function Order() {
  const orders = useAppSelector(
    (store) => store?.orderContainer?.orders
  )?.filter(
    (kot) => kot?.value?.chefAssign === "" && kot.value.completed === 0
  );

  // console.log(orders);

  const { dishesh, tables } = useAppSelector(
    (store) => store?.restaurantInfoSlice?.defaultValues
  );

  // console.log({ noRepeatContainer });

  const safeArea = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const acceptOrder = async (
    orderId: Kot["id"],
    tableNumber: number,
    tableSectionId: string
  ) => {
    // const promiseContainer: Promise<AxiosResponse<any, any>>[] = [];

    // for (let x of ordersId) {
    //   promiseContainer.push(
    //     axios.patch("orders/accept", {
    //       orderId: x,
    //       tableNumber,
    //       tableSectionId,
    //     })
    //   );
    // }
    // dispatch(action_types.toggleGlobalLoader(true));
    try {
      // await Promise.all(promiseContainer);

      await axiosPatchFunction({
        parentUrl: "orders",
        childUrl: "accept",
        // toggleGlobalLoader: true,
        showGlobalLoader: true,
        data: {
          orderId,
          tableNumber,
          tableSectionId,
        },
        errorInfo: {
          code: 409,
          message: "Order already taken",
        },
      });
    } catch (error) {
      if (constants.IS_DEVELOPMENT) console.log(error);
      alert("Some error");
    }

    // dispatch(action_types.toggleGlobalLoader(false));

    if (orders.length < 7) {
      // console.log(orderId);
      await fetchAndStoreOrders();
      // await fetchAndStoreKot();
    }
  };

  // const keyExtractor = (item: DishOrderType) => item.orderId;

  const keyExtractor = (item: Kot) => item.id;

  const renderItem = ({ item }: { item: Kot }) => {
    const tableSectionDetail = tables.find(
      (table) => table.id === item.value.tableSectionId
    );

    return (
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {tableSectionDetail?.prefix}
          {item?.value?.tableNumber}
          {tableSectionDetail?.suffix}
        </Text>
        {item?.value?.orders.map((order) => {
          const fullItemQuantity = parseInt(order?.fullQuantity);
          const halfItemQuantity = parseInt(order?.halfQuantity);

          return (
            <Fragment key={order.orderId}>
              <View>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text variant="bodyLarge">
                        {dishesh?.[order?.dishId]} - {fullItemQuantity}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              {order?.user_description ? (
                <Text
                  variant="bodyLarge"
                  style={{ paddingVertical: 5, paddingHorizontal: 5 }}
                >
                  Description :- {order?.user_description}
                </Text>
              ) : null}
            </Fragment>
          );
        })}
        <Button
          mode="contained"
          style={{ alignSelf: "flex-end", marginRight: 20 }}
          onPress={() =>
            acceptOrder(
              item.id,
              item.value.tableNumber,
              item.value.tableSectionId
            )
          }
        >
          Accept
        </Button>
      </View>
    );
  };

  return (
    <>
      <FlatList
        contentContainerStyle={{
          paddingBottom: safeArea.bottom,
          paddingLeft: safeArea.left,
          paddingRight: safeArea.right,
        }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={orders}
      />
    </>
  );
}

export default Order;

const style = StyleSheet.create({
  orderQuantity: { borderWidth: 1, borderStyle: "solid" },
  orderQuantityBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
  },
  addOnsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
  },
  addOnsText: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 3,
    borderRadius: 6,
  },
});
