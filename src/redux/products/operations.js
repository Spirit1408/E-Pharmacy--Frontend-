import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      
      const { page, perPage } = state.products.pagination;
      const { name } = state.products.filter;
      
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("perPage", perPage);
      
      if (name) {
        params.append("name", name);
      }
      
      const response = await axios.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (productData, thunkAPI) => {
    try {
      const response = await axios.post("/products", productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ productId, productData }, thunkAPI) => {
    try {
      const response = await axios.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(`/products/${productId}`);
      return { id: productId, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);