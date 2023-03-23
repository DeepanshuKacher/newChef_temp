import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, DataTable, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { axiosPatchFunction } from "../../useFullItems/axios";
import { useAppSelector } from "../../useFullItems/redux-store";
import type { Order } from "../order/redux";

function OnGoingOrder() {
  /* states */
  const selfInfo = useAppSelector((store) => store.selfInfo.defaultValues);

  const orders = useAppSelector((store) => store.orderContainer.orders)?.filter(
    (order) => order.chefAssign === selfInfo.id && !order.completed
  );

  console.log({
    allOrders: useAppSelector((store) => store.orderContainer.orders),
  });

  console.log({ orders });

  const { dishesh, tables } = useAppSelector(
    (store) => store.restaurantInfoSlice.defaultValues
  );

  /* functions */

  const rejetOrder = (item: Order) => {
    axiosPatchFunction({
      parentUrl: "orders",
      childUrl: "reject",
      data: {
        orderId: item.orderId,
        tableNumber: item.tableNumber,
        tableSectionId: item.tableSectionId,
      },
      showGlobalLoader: true,
    });
  };

  const completeOrder = (item: Order) => {
    axiosPatchFunction({
      parentUrl: "orders",
      childUrl: "complete",
      data: {
        orderId: item.orderId,
        tableNumber: item.tableNumber,
        tableSectionId: item.tableSectionId,
      },
      showGlobalLoader: true,
    });
  };

  const safeArea = useSafeAreaInsets();

  const keyExtractor = (item: Order) => item.orderId;

  const renderItem = ({ item }: { item: Order }) => {
    const tableSectionDetail = tables.find(
      (table) => table.id === item.tableSectionId
    );
    return (
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {tableSectionDetail?.prefix}
          {item.tableNumber}
          {tableSectionDetail?.suffix}
        </Text>
        <Text style={{ textAlign: "center" }} variant="titleLarge">
          {dishesh[item.dishId]}
        </Text>
        <View>
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
            {/* <DataTable.Row>
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
            </DataTable.Row> */}
          </DataTable>
        </View>
        {item.user_description && (
          <Text
            variant="bodyLarge"
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          >
            Description :- {item.user_description}
          </Text>
        )}
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
              rejetOrder(item);
            }}
          >
            Reject
          </Button>
          <Button
            mode="contained"
            buttonColor="green"
            onPress={() => {
              completeOrder(item);
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
      ItemSeparatorComponent={() => (
        <Divider bold={true} style={{ height: 8 }} />
      )}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // ListHeaderComponent={<Text>Orders</Text>}
      data={orders}
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
