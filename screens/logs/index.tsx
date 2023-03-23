import { useState, useCallback } from "react";
import { RefreshControl } from "react-native";
import { DataTable } from "react-native-paper";
import ScreenWrapper from "../../ScreenWrapper";
type Props = {};

const sortedItems: {
  key: number;
  name: string;
  calories: number;
  fat: number;
}[] = [];

(() => {
  for (let i = 0; i < 60; i++) {
    sortedItems.push({
      key: i,
      calories: i * 10,
      fat: i * 12,
      name: 'Deepanshu K',
    });
  }
})();

function Logs({}: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dish Name</DataTable.Title>
          <DataTable.Title numeric>Table</DataTable.Title>
          <DataTable.Title numeric>Date Time</DataTable.Title>
        </DataTable.Header>

        {sortedItems.map((item) => (
          <DataTable.Row key={item.key} onPress={() => alert(item.name)}>
            <DataTable.Cell>Chicken Biryni m</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>24/12 11:24</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScreenWrapper>
  );
}

export { Logs };
