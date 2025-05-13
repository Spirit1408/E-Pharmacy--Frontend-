import { createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "./operations";

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

const customersSlice = createSlice({
  name: "customers",
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
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const { setNameFilter, setPage, resetFilters } = customersSlice.actions;
export const customersReducer = customersSlice.reducer;