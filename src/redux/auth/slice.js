import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: {
			name: null,
			email: null,
		},
		token: null,
		error: null,
		isLoggedIn: false,
		isRefreshing: false,
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.accessToken;
				state.isLoggedIn = true;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(refreshUser.pending, (state) => {
				state.isRefreshing = true;
				state.isLoading = true;
			})

			.addCase(refreshUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.accessToken;
				state.isLoggedIn = true;
				state.isRefreshing = false;
				state.isLoading = false;
				state.error = null;
			})

			.addCase(refreshUser.rejected, (state) => {
				state.isRefreshing = false;
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
				state.error = null;
			});
	},
});

export const authReducer = authSlice.reducer;
