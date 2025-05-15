import { createSlice } from "@reduxjs/toolkit";
import {
	getSuppliers,
	addSupplier,
	updateSupplier,
	deleteSupplier,
} from "./operations";

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
		name: "",
	},
};

const suppliersSlice = createSlice({
	name: "suppliers",
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
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSuppliers.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getSuppliers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.data;
				state.pagination = action.payload.pagination;
			})
			.addCase(getSuppliers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(addSupplier.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addSupplier.fulfilled, (state, action) => {
				state.isLoading = false;
				if (state.pagination.page === 1) {
					state.items = [
						action.payload.data,
						...state.items.slice(0, state.pagination.perPage - 1),
					];
				}
			})
			.addCase(addSupplier.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(updateSupplier.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateSupplier.fulfilled, (state, action) => {
				state.isLoading = false;
				const updatedSupplier = action.payload.data;
				const index = state.items.findIndex(
					(item) => item._id === updatedSupplier._id,
				);
				if (index !== -1) {
					state.items[index] = updatedSupplier;
				}
			})
			.addCase(updateSupplier.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(deleteSupplier.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteSupplier.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = state.items.filter(
					(item) => item._id !== action.payload.id,
				);
				if (state.items.length === 0 && state.pagination.page > 1) {
					state.pagination.page -= 1;
				}
			})
			.addCase(deleteSupplier.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setNameFilter, setPage, resetFilters } = suppliersSlice.actions;
export const suppliersReducer = suppliersSlice.reducer;
