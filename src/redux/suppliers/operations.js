import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      
      const { page, perPage } = state.suppliers.pagination;
      const { name } = state.suppliers.filter;
      
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("perPage", perPage);
      
      if (name) {
        params.append("name", name);
      }
      
      const response = await axios.get(`/suppliers?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (supplierData, thunkAPI) => {
    try {
      const response = await axios.post("/suppliers", supplierData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async ({ supplierId, supplierData }, thunkAPI) => {
    try {
      const response = await axios.put(`/suppliers/${supplierId}`, supplierData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (supplierId, thunkAPI) => {
    try {
      const response = await axios.delete(`/suppliers/${supplierId}`);
      return { id: supplierId, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);