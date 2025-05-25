import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'Laptop', price: 1000, image: 'https://via.placeholder.com/100' },
  { id: '2', title: 'Phone', price: 500, image: 'https://via.placeholder.com/100' },
  { id: '3', title: 'Headphones', price: 200, image: 'https://via.placeholder.com/100' },
];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
