import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { addToCart } from '../store/cartSlice';

export default function CatalogScreen({ navigation }) {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem product={item} onAdd={(p) => dispatch(addToCart(p))} />
        )}
      />
    </View>
  );
}
