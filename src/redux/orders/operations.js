import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk(
	"orders/fetchAll",
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();

			const { page, perPage } = state.orders.pagination;
			const { name } = state.orders.filter;

			const params = new URLSearchParams();
			params.append("page", page);
			params.append("perPage", perPage);

			if (name) {
				params.append("name", name);
			}

			const response = await axios.get(`/orders?${params.toString()}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
