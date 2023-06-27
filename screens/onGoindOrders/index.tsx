import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, DataTable, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { axiosPatchFunction } from "../../useFullItems/axios";
import {
  useAppSelector,
  useAppDispatch,
  action_types,
} from "../../useFullItems/redux-store";
import type { Order } from "../order/redux";
import { Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import { constants } from "../../useFullItems/constants";
import { Kot } from "../../useFullItems/functions/onLoad/fetchAndStoreFunctions";

function OnGoingOrder() {
  /* states */
  const selfInfo = useAppSelector((store) => store.selfInfo.defaultValues);

  const kots = useAppSelector((store) => store.orderContainer.orders)?.filter(
    (order) => order.value.chefAssign === selfInfo?.id && !order.value.completed
  );

  // console.log(orders);

  const { dishesh, tables } = useAppSelector(
    (store) => store.restaurantInfoSlice.defaultValues
  );

  const dispatch = useAppDispatch();

  /* functions */

  const rejetOrder = async (
    orderId: Kot["id"],
    tableNumber: number,
    tableSectionId: string
  ) => {
    try {
      await axiosPatchFunction({
        parentUrl: "orders",
        childUrl: "reject",
        // toggleGlobalLoader: true,
        showGlobalLoader: true,
        data: {
          orderId,
          tableNumber,
          tableSectionId,
        },
      });
    } catch (error) {
      if (constants.IS_DEVELOPMENT) console.log(error);
      alert("Some error");
    }
    // const promiseContainer: Promise<AxiosResponse<any, any>>[] = [];
    // for (let x of orderId) {
    //   promiseContainer.push(
    //     axios.patch("/orders/reject", {
    //       orderId: x,
    //       tableNumber,
    //       tableSectionId,
    //     })
    //   );
    // }
    // dispatch(action_types.toggleGlobalLoader(true));
    // try {
    //   await Promise.all(promiseContainer);
    // } catch (error) {
    //   if (constants.IS_DEVELOPMENT) console.log(error);
    //   alert("Some error");
    // }
    // dispatch(action_types.toggleGlobalLoader(false));
  };

  const completeOrder = async (
    orderId: string,
    tableNumber: number,
    tableSectionId: string
  ) => {
    try {
      await axiosPatchFunction({
        parentUrl: "orders",
        childUrl: "complete",
        // toggleGlobalLoader: true,
        showGlobalLoader: true,
        data: {
          orderId,
          tableNumber,
          tableSectionId,
        },
      });
    } catch (error) {
      if (constants.IS_DEVELOPMENT) console.log(error);
      alert("Some error");
    }
    // const promiseContainer: Promise<AxiosResponse<any, any>>[] = [];

    // for (let x of orderId) {
    //   promiseContainer.push(
    //     axios.patch("/orders/complete", {
    //       orderId: x,
    //       tableNumber,
    //       tableSectionId,
    //     })
    //   );
    // }

    // dispatch(action_types.toggleGlobalLoader(true));

    // try {
    //   await Promise.all(promiseContainer);
    // } catch (error) {
    //   if (constants.IS_DEVELOPMENT) console.log(error);
    //   alert("Some error");
    // }

    // dispatch(action_types.toggleGlobalLoader(false));
  };

  const safeArea = useSafeAreaInsets();

  const keyExtractor = (item: Kot) => item.id;

  const renderItem = ({ item }: { item: Kot }) => {
    // const firstOrder = noRepeatContainer[convertOrderKeyToUUID(item[0])];

    const tableSectionDetail = tables.find(
      (table) => table.id === item.value.tableSectionId
    );

    return (
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {tableSectionDetail?.prefix}
          {item.value.tableNumber}
          {tableSectionDetail?.suffix}
        </Text>
        {/* <Text style={{ textAlign: "center" }} variant="titleLarge">
          {dishesh[item.dishId]}
        </Text> */}

        {item.value.orders.map((order) => {
          const fullItemQuantity = parseInt(order.fullQuantity || "0");
          const halfItemQuantity = parseInt(order.halfQuantity || "0");

          return (
            <Fragment key={order.orderId}>
              {/* <Text style={{ textAlign: "center" }} variant="titleLarge">
                {dishesh?.[orderDetail?.dishId]}
              </Text> */}
              <View>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text variant="bodyLarge">
                        {dishesh?.[order.dishId]} - {fullItemQuantity}
                      </Text>
                    </DataTable.Cell>
                    {/* <DataTable.Title>
                      -
                      {orderDetail?.size === "large"
                        ? "L"
                        : orderDetail?.size === "medium"
                        ? "M"
                        : "S"}
                    </DataTable.Title> */}
                    {/* {fullItemQuantity ? (
                      <DataTable.Cell numeric>
                        <Text variant="bodyLarge">F - {fullItemQuantity}</Text>
                      </DataTable.Cell>
                    ) : null}
                    {halfItemQuantity ? (
                      <DataTable.Cell numeric>
                        <Text variant="bodyLarge">H - {halfItemQuantity}</Text>
                      </DataTable.Cell>
                    ) : null} */}
                  </DataTable.Row>
                </DataTable>
                {/* <DataTable>
                  <DataTable.Header>
                    <DataTable.Title> </DataTable.Title>
                    {fullItemQuantity ? (
                      <DataTable.Title>
                        <Text variant="titleSmall">Full</Text>
                      </DataTable.Title>
                    ) : null}
                    {halfItemQuantity ? (
                      <DataTable.Title>
                        <Text variant="titleSmall">Half</Text>
                      </DataTable.Title>
                    ) : null}
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Title>
                      <Text variant="titleSmall">{orderDetail?.size}</Text>
                    </DataTable.Title>
                    {fullItemQuantity ? (
                      <DataTable.Cell>
                        <Text variant="bodyLarge">{fullItemQuantity}</Text>
                      </DataTable.Cell>
                    ) : null}
                    {halfItemQuantity ? (
                      <DataTable.Cell>
                        <Text variant="bodyLarge">{halfItemQuantity}</Text>
                      </DataTable.Cell>
                    ) : null}
                  </DataTable.Row>
                </DataTable> */}
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

        {/* <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title> </DataTable.Title>
                <DataTable.Title>
                  <Text variant="titleSmall">Full</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text variant="titleSmall">Half</Text>
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Title>
                  <Text variant="titleSmall">{item.size}</Text>
                </DataTable.Title>
                <DataTable.Cell>
                  <Text variant="bodyLarge">{item.fullQuantity}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodyLarge">{item.halfQuantity}</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Title>
                  <Text variant="titleSmall">Medium</Text>
                </DataTable.Title>
                <DataTable.Cell>
                  <Text variant="bodyLarge">8</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodyLarge">8</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Title>
                  <Text variant="titleSmall">Small</Text>
                </DataTable.Title>
                <DataTable.Cell>
                  <Text variant="bodyLarge">8</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text variant="bodyLarge">8</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View> */}

        {/* {item.user_description && (
          <Text
            variant="bodyLarge"
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          >
            Description :- {item.user_description}
          </Text>
        )} */}
        {/* <View style={style.addOnsView} className="gap-1">
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
        </View> */}
        <View
          // className="flex-row justify-around mt-3"
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Button
            mode="contained"
            buttonColor="#cf3535"
            onPress={() => {
              rejetOrder(
                item.id,
                item.value.tableNumber,
                item.value.tableSectionId
              );
              // console.log("first");
            }}
          >
            Reject
          </Button>
          <Button
            mode="contained"
            buttonColor="green"
            onPress={() => {
              completeOrder(
                item.id,
                item.value.tableNumber,
                item.value.tableSectionId
              );
            }}
          >
            Prepared
          </Button>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
      // style={{
      //   backgroundColor: colors.background,
      // }}
      // ItemSeparatorComponent={() => (
      //   <Divider bold={true} style={{ height: 5 }} />
      // )}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // ListHeaderComponent={<Text>Orders</Text>}
      data={kots}
    />
  );
}

export default OnGoingOrder;

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

/*       <View>
        <Text variant="titleLarge">{data.title}</Text>
        <View style={style.orderQuantity}>
          <View style={style.orderQuantityBox}>
            <Text> </Text>
            <Text>Full</Text>
            <Text>Half</Text>
          </View>
          <View style={style.orderQuantityBox}>
            <Text>Large</Text>
            <Text>2</Text>
            <Text>3</Text>
          </View>
          <View style={style.orderQuantityBox}>
            <Text>Medium</Text>
            <Text>2</Text>
            <Text>8</Text>
          </View>
          <View style={style.orderQuantityBox}>
            <Text>Small</Text>
            <Text>8</Text>
            <Text>2</Text>
          </View>
        </View>
      </View> */
