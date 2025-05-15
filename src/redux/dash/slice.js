import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "./operations";

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		totalProducts: 0,
		totalSuppliers: 0,
		totalCustomers: 0,
		latestCustomers: [],
		latestExpenses: [],
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDashboardData.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDashboardData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.totalProducts = action.payload.total_products;
				state.totalSuppliers = action.payload.total_suppliers;
				state.totalCustomers = action.payload.total_customers;
				state.latestCustomers = action.payload.latest_customers;
				state.latestExpenses = action.payload.latest_expenses;
			})
			.addCase(fetchDashboardData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const dashboardReducer = dashboardSlice.reducer;
