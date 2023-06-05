import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, DataTable, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { axiosPatchFunction } from "../../useFullItems/axios";
import {
  action_types,
  useAppSelector,
  useAppDispatch,
} from "../../useFullItems/redux-store";
import type { Order as DishOrderType } from "./redux";
import {
  fetchAndStoreKot,
  fetchAndStoreOrders,
} from "../../useFullItems/functions/onLoad/fetchAndStoreFunctions";
import { Fragment, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { constants } from "../../useFullItems/constants";
// import { useToast } from "react-native-toast-notifications";

function Order() {
  const orders = useAppSelector(
    (store) => store?.orderContainer?.orders
  )?.filter((order) => order?.chefAssign === undefined && !order?.completed);

  // console.log(orders);

  const { dishesh, tables } = useAppSelector(
    (store) => store?.restaurantInfoSlice?.defaultValues
  );

  const { noRepeatContainer, kot } = useAppSelector(
    (store) => store?.orderContainer
  );

  // console.log({ noRepeatContainer });

  const safeArea = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  // const toast = useToast();

  // const itemHeight = 260;

  // const safeArea = useMemo(() => useSafeAreaInsets(), []);

  const convertOrderKeyToUUID = (orderKey: string) => {
    return orderKey.split(":")[0];
  };

  // const acceptOrder = async (order: DishOrderType) => {
  //   axiosPatchFunction({
  //     parentUrl: "orders",
  //     childUrl: "accept",
  //     data: {
  //       orderId: order?.orderId,
  //       tableNumber: parseInt(order?.tableNumber),
  //       tableSectionId: order?.tableSectionId,
  //     },
  //     showGlobalLoader: true,
  //   });

  //   if (orders.length < 5) {
  //     await fetchAndStoreOrders();
  //   }
  // };,
  const acceptOrder = async (
    ordersId: string[],
    tableNumber: number,
    tableSectionId: string
  ) => {
    // axiosPatchFunction({
    //   parentUrl: "orders",
    //   childUrl: "accept",
    //   data: {
    //     orderId: order?.orderId,
    //     tableNumber: parseInt(order?.tableNumber),
    //     tableSectionId: order?.tableSectionId,
    //   },
    //   showGlobalLoader: true,
    // });

    const promiseContainer: Promise<AxiosResponse<any, any>>[] = [];

    for (let x of ordersId) {
      promiseContainer.push(
        axios.patch("orders/accept", {
          orderId: x,
          tableNumber,
          tableSectionId,
        })
      );
    }
    dispatch(action_types.toggleGlobalLoader(true));
    try {
      await Promise.all(promiseContainer);
    } catch (error) {
      if (constants.IS_DEVELOPMENT) console.log(error);
      alert("Some error");
    }

    dispatch(action_types.toggleGlobalLoader(false));

    if (orders.length < 7) {
      await fetchAndStoreOrders();
      await fetchAndStoreKot();
    }
  };

  //  const showNotification = (context: string) => {
  //   toast.show(context, {
  //     duration: 60 * 1000,
  //   });
  // };

  // const keyExtractor = (item: DishOrderType) => item.orderId;

  const keyExtractor = (item: string[]) => item?.[0];

  const renderItem = ({ item }: { item: string[] }) => {
    const firstOrder = noRepeatContainer[convertOrderKeyToUUID(item[0])];

    const tableSectionDetail = tables.find(
      (table) => table.id === firstOrder?.["tableSectionId"]
    );

    const orderExist = orders?.find(
      (order) => order?.orderId === firstOrder?.orderId
    );

    if (!orderExist) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {tableSectionDetail?.prefix}
          {firstOrder?.["tableNumber"]}
          {tableSectionDetail?.suffix}
        </Text>
        {item.map((orderRedisKey) => {
          const orderDetail =
            noRepeatContainer[convertOrderKeyToUUID(orderRedisKey)];

          const fullItemQuantity = parseInt(orderDetail?.fullQuantity || "0");

          const halfItemQuantity = parseInt(orderDetail?.halfQuantity || "0");

          return (
            <Fragment key={orderRedisKey}>
              {/* <Text style={{ textAlign: "center" }} variant="titleLarge">
                {dishesh?.[orderDetail?.dishId]}
              </Text> */}
              <View>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text variant="bodyLarge">
                        {dishesh?.[orderDetail?.dishId]} - {fullItemQuantity}
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
              {orderDetail?.user_description ? (
                <Text
                  variant="bodyLarge"
                  style={{ paddingVertical: 5, paddingHorizontal: 5 }}
                >
                  Description :- {orderDetail?.user_description}
                </Text>
              ) : null}
            </Fragment>
          );
        })}
        {/* <Text style={{ textAlign: "center" }} variant="titleLarge">
          {dishesh[item.dishId]}
        </Text>
        <View>
          <DataTable>
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
                <Text variant="titleSmall">{item?.size}</Text>
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
          </DataTable>
        </View>
        {item?.user_description ? (
          <Text
            variant="bodyLarge"
            style={{ paddingVertical: 5, paddingHorizontal: 5 }}
          >
            Description :- {item.user_description}
          </Text>
        ) : null} */}
        <Button
          mode="contained"
          style={{ alignSelf: "flex-end", marginRight: 20 }}
          onPress={() => {
            acceptOrder(
              item.map((orderKey) => convertOrderKeyToUUID(orderKey)),
              parseInt(firstOrder.tableNumber),
              firstOrder.tableSectionId
            );
            // console.log("first");
          }}
        >
          Accept
        </Button>
      </View>
    );
  };
  // const renderItem = ({ item }: { item: DishOrderType }) => {
  //   const tableSectionDetail = tables.find(
  //     (table) => table.id === item.tableSectionId
  //   );

  //   const fullItemQuantity = parseInt(item?.fullQuantity || "0");

  //   const halfItemQuantity = parseInt(item.halfQuantity || "0");

  //   return (
  //     <View style={{ paddingVertical: 20 }}>
  //       <Text style={{ textAlign: "center" }} variant="titleLarge">
  //         {tableSectionDetail?.prefix}
  //         {item.tableNumber}
  //         {tableSectionDetail?.suffix}
  //       </Text>
  //       <Text style={{ textAlign: "center" }} variant="titleLarge">
  //         {dishesh[item.dishId]}
  //       </Text>
  //       <View>
  //         <DataTable>
  //           <DataTable.Header>
  //             <DataTable.Title> </DataTable.Title>
  //             {fullItemQuantity ? (
  //               <DataTable.Title>
  //                 <Text variant="titleSmall">Full</Text>
  //               </DataTable.Title>
  //             ) : null}
  //             {halfItemQuantity ? (
  //               <DataTable.Title>
  //                 <Text variant="titleSmall">Half</Text>
  //               </DataTable.Title>
  //             ) : null}
  //           </DataTable.Header>
  //           <DataTable.Row>
  //             <DataTable.Title>
  //               <Text variant="titleSmall">{item?.size}</Text>
  //             </DataTable.Title>
  //             {fullItemQuantity ? (
  //               <DataTable.Cell>
  //                 <Text variant="bodyLarge">{fullItemQuantity}</Text>
  //               </DataTable.Cell>
  //             ) : null}
  //             {halfItemQuantity ? (
  //               <DataTable.Cell>
  //                 <Text variant="bodyLarge">{halfItemQuantity}</Text>
  //               </DataTable.Cell>
  //             ) : null}
  //           </DataTable.Row>
  //         </DataTable>
  //       </View>
  //       {item?.user_description ? (
  //         <Text
  //           variant="bodyLarge"
  //           style={{ paddingVertical: 5, paddingHorizontal: 5 }}
  //         >
  //           Description :- {item.user_description}
  //         </Text>
  //       ) : null}
  //       <Button
  //         mode="contained"
  //         style={{ alignSelf: "flex-end", marginRight: 20 }}
  //         onPress={() => {
  //           acceptOrder(item);
  //         }}
  //       >
  //         Accept
  //       </Button>
  //     </View>
  //   );
  // };

  return (
    <>
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
        data={kot}
        // getItemLayout={(data, index) => ({
        //   length: itemHeight,
        //   offset: itemHeight * index,
        //   index,
        // })}
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
