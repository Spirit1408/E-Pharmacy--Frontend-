import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import DashboardPage from "../pages/DashboardPage";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import AllProductsPage from "../pages/AllProductsPage";
import AllOrdersPage from "../pages/AllOrdersPage";
import AllSuppliersPage from "../pages/AllSuppliersPage";
import AllCustomersPage from "../pages/AllCustomersPage";
import { Loader } from "./Loader/Loader";

function App() {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	if (isRefreshing) {
		return <Loader />;
	}

	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<RestrictedRoute
							component={<LoginPage />}
							redirectTo="/dashboard"
						/>
					}
				/>

				<Route
					path="/"
					element={
						<PrivateRoute component={<SharedLayout />} redirectTo="/login" />
					}
				>
					<Route index element={<Navigate to="/dashboard" />} />
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="products" element={<AllProductsPage />} />
					<Route path="orders" element={<AllOrdersPage />} />
					<Route path="suppliers" element={<AllSuppliersPage />} />
					<Route path="customers" element={<AllCustomersPage />} />
				</Route>

				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>

			<ToastContainer position="bottom-right" autoClose={3000} />
		</>
	);
}

export default App;
