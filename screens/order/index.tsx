import { View, FlatList, StyleSheet } from "react-native";
import { Divider, Text, DataTable, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { axiosPatchFunction } from "../../useFullItems/axios";
import { useAppSelector } from "../../useFullItems/redux-store";
import type { Order as DishOrderType } from "./redux";
import { fetchAndStoreOrders } from "../../useFullItems/functions/onLoad/fetchAndStoreFunctions";

function Order() {
  const orders = useAppSelector(
    (store) => store?.orderContainer?.orders
  )?.filter((order) => order?.chefAssign === undefined && !order?.completed);

  const { dishesh, tables } = useAppSelector(
    (store) => store?.restaurantInfoSlice?.defaultValues
  );

  const safeArea = useSafeAreaInsets();

  const itemHeight = 260;

  // const safeArea = useMemo(() => useSafeAreaInsets(), []);

  const acceptOrder = async (order: DishOrderType) => {
    axiosPatchFunction({
      parentUrl: "orders",
      childUrl: "accept",
      data: {
        orderId: order?.orderId,
        tableNumber: parseInt(order?.tableNumber),
        tableSectionId: order?.tableSectionId,
      },
      showGlobalLoader: true,
    });

    if (orders.length < 5) {
      await fetchAndStoreOrders();
    }
  };

  const keyExtractor = (item: DishOrderType) => item.orderId;

  const renderItem = ({ item }: { item: DishOrderType }) => {
    const tableSectionDetail = tables.find(
      (table) => table.id === item.tableSectionId
    );
    return (
      <View style={{ paddingVertical: 20, height: itemHeight }}>
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
        {/* {item.user_description && ( */}
        <Text
          variant="bodyLarge"
          style={{ paddingVertical: 5, paddingHorizontal: 5 }}
        >
          Description :- {item.user_description}
        </Text>
        {/* )} */}
        {/* <View style={style.addOnsView} className="gap-1">
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
          <Text style={style.addOnsText}>Extra Chilli</Text>
        </View> */}
        <Button
          mode="contained"
          style={{ alignSelf: "flex-end", marginRight: 20 }}
          onPress={() => {
            acceptOrder(item);
          }}
        >
          Accept
        </Button>
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
        <Divider bold={true} style={{ height: 5 }} />
      )}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={orders}
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
    />
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
