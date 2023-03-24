import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from "react-native";
import {
  Button,
  Portal,
  Dialog,
  Text,
  Provider,
  Surface,
  DataTable,
  Chip,
} from "react-native-paper";
import { OrderLogType } from "../screens/logs";
import { useAppSelector } from "../useFullItems/redux-store";

interface Props {
  logDetail: OrderLogType | undefined;
  close: () => void;
}
export const DetailModal_Of_log = (props: Props) => {
  const { close, logDetail } = props;

  const orderData = new Date(logDetail?.orderTimeStamp || "");

  const { dishesh, tables } = useAppSelector(
    (store) => store.restaurantInfoSlice.defaultValues
  );

  const tableInfo = tables.find(
    (table) => table.id === logDetail?.SessionLogs?.tableId
  );

  return (
    <Modal visible={!!logDetail} transparent>
      <Pressable
        style={{
          backgroundColor: "#000000ab",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        onPress={close}
      >
        <Pressable
          style={{
            width: "80%",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
          }}
        >
          {logDetail && (
            <Text
              variant="titleLarge"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              {dishesh[logDetail?.dishId]}
            </Text>
          )}
          <Text
            variant="bodyLarge"
            style={{ paddingHorizontal: 10, textAlign: "center" }}
          >
            {tableInfo?.prefix}
            {logDetail?.SessionLogs.tableNumber}
            {tableInfo?.suffix}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title> </DataTable.Title>
              <DataTable.Title>Half</DataTable.Title>
              <DataTable.Title>Full</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Title>{logDetail?.size}</DataTable.Title>
              <DataTable.Cell>{logDetail?.halfQuantity}</DataTable.Cell>
              <DataTable.Cell>{logDetail?.fullQuantity}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          {logDetail?.user_description && (
            <Text>{logDetail?.user_description}</Text>
          )}
          <Text
            variant="titleMedium"
            style={{ textAlign: "center", marginVertical: 10 }}
          >
            {orderData.toLocaleTimeString()} - {orderData.toDateString()}
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
