import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { addOrder } from '../store/ordersSlice';
import { clearCart } from '../store/cartSlice';

export default function CheckoutScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const submit = () => {
    if (!name || !email) return Alert.alert('Fill all fields');
    dispatch(setUser({ name, email }));
    dispatch(addOrder({ items: cart, user: { name, email }, date: new Date().toISOString() }));
    dispatch(clearCart());
    Alert.alert('Order placed!');
    navigation.navigate('Orders');
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Place Order" onPress={submit} />
    </View>
  );
}
