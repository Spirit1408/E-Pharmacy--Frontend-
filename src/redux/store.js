import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { dashboardReducer } from "./dash/slice";
import { ordersReducer } from "./orders/slice";
import { customersReducer } from "./customers/slice";
import { productsReducer } from "./products/slice";
import { suppliersReducer } from "./suppliers/slice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token"],
};

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		dashboard: dashboardReducer,
		orders: ordersReducer,
		customers: customersReducer,
		products: productsReducer,
		suppliers: suppliersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),

	devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);