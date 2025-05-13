import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  pagination: { 
    page: 1,
    perPage: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filter: {
    name: ""
  }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.filter.name = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetFilters: (state) => {
      state.filter.name = "";
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const { setNameFilter, setPage, resetFilters } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;