import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authToasts } from "../../utils/toast";

axios.defaults.baseURL = "https://e-pharmacy-backend-aut9.onrender.com/api";
axios.defaults.withCredentials = true;

const setAuthHeader = (token) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

export const login = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post("/user/login", credentials);
			setAuthHeader(response.data.data.accessToken);
			authToasts.loginSuccess();
			return response.data.data;
		} catch (e) {
			authToasts.loginError(e.response?.data?.message);
			return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await axios.post("/user/logout");
		clearAuthHeader();
		authToasts.logoutSuccess();
	} catch (e) {
		authToasts.logoutError();
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const refreshUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.token;

		if (persistedToken === null) {
			return thunkAPI.rejectWithValue("No valid session");
		}

		try {
			const response = await axios.post("/user/refresh");
			setAuthHeader(response.data.data.accessToken);
			return response.data.data;
		} catch (e) {
			clearAuthHeader();
			authToasts.sessionExpired();
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);
