import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      
      const { page, perPage } = state.customers.pagination;
      const { name } = state.customers.filter;
      
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("perPage", perPage);
      
      if (name) {
        params.append("name", name);
      }
      
      const response = await axios.get(`/customers?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);