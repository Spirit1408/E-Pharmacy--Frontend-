import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from "./operations";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: {
			name: null,
			email: null,
		},
		token: null,
		isLoggedIn: false,
		isRefreshing: false,
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.token = action.payload.accessToken;
				state.isLoggedIn = true;
				state.isLoading = false;
			}) 
			.addCase(logout.fulfilled, (state) => {
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
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
			}) 

			.addCase(refreshUser.rejected, (state) => {
				state.isRefreshing = false;
				state.user = { name: null, email: null };
				state.token = null;
				state.isLoggedIn = false;
				state.isLoading = false;
			}); 
	},
});

export const authReducer = authSlice.reducer; 