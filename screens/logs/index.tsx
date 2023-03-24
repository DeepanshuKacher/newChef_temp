import { useState, useCallback, useEffect } from "react";
import { RefreshControl } from "react-native";
import { DataTable } from "react-native-paper";
import ScreenWrapper from "../../ScreenWrapper";
import { useAppSelector } from "../../useFullItems/redux-store";
import { Order } from "../order/redux";
import { axiosGetFunction } from "../../useFullItems/axios";
import { DetailModal_Of_log } from "../../components/LogDetailModal";
export interface OrderLogType
  extends Omit<
    Order,
    "orderId" | "orderedBy" | "tableSectionId" | "tableNumber"
  > {
  SessionLogs: {
    tableNumber: number;
    tableId: string;
  };
  id: string;
  orderTimeStamp: string;
  sessionLogsUuid: string;
  waiterId: string;
  chefId: string;
}

function Logs() {
  const [refreshing, setRefreshing] = useState(false);
  const [orderLogs, setOrderLogs] = useState<OrderLogType[]>([]);
  const [orderDetail, setOrderDetial] = useState<OrderLogType>();

  const { tables, dishesh } = useAppSelector(
    (store) => store.restaurantInfoSlice.defaultValues
  );

  useEffect(() => {
    getOrderLogs();
  }, []);

  const getOrderLogs = () => {
    setRefreshing(true);
    axiosGetFunction({
      parentUrl: "orders",
      childUrl: "logs",
      thenFunction: (e: any) => {
        setOrderLogs(e);
        setRefreshing(false);
      },
    });
  };

  const closeDetialModal = () => setOrderDetial(undefined);

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getOrderLogs} />
      }
    >
      <DetailModal_Of_log logDetail={orderDetail} close={closeDetialModal} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dish Name</DataTable.Title>
          <DataTable.Title numeric>Table</DataTable.Title>
          <DataTable.Title numeric>Date Time</DataTable.Title>
        </DataTable.Header>

        {orderLogs.map((item) => {
          const table = tables.find(
            (table) => table.id === item.SessionLogs.tableId
          );
          const orderData = new Date(item.orderTimeStamp);
          return (
            <DataTable.Row key={item.id} onPress={() => setOrderDetial(item)}>
              <DataTable.Cell>{dishesh[item.dishId]}</DataTable.Cell>
              <DataTable.Cell numeric>
                {table?.prefix}
                {item.SessionLogs.tableNumber}
                {table?.suffix}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {orderData.getHours()}:{orderData.getMinutes()}{" "}
                {orderData.getDate()}/{orderData.getMonth() + 1}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScreenWrapper>
  );
}

export { Logs };
