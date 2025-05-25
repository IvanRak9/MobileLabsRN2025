import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersScreen() {
  const orders = useSelector(state => state.orders);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user.name} — {item.user.email}</Text>
            <Text>{item.items.length} item(s)</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
