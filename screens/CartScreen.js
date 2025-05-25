import React from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

export default function CartScreen({ navigation }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdate={(id, qty) => dispatch(updateQuantity({ id, quantity: qty }))}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
        )}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ${total}</Text>
      <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}
