import { createSlice } from "@reduxjs/toolkit";
import {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
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

const productsSlice = createSlice({
	name: "products",
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
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.data;
				state.pagination = action.payload.pagination;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				if (state.pagination.page === 1) {
					state.items = [
						action.payload.data,
						...state.items.slice(0, state.pagination.perPage - 1),
					];
				}
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				const updatedProduct = action.payload.data;
				const index = state.items.findIndex(
					(item) => item._id === updatedProduct._id,
				);
				if (index !== -1) {
					state.items[index] = updatedProduct;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = state.items.filter(
					(item) => item._id !== action.payload.id,
				);
				if (state.items.length === 0 && state.pagination.page > 1) {
					state.pagination.page -= 1;
				}
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setNameFilter, setPage, resetFilters } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
