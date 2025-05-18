import css from "./SharedLayout.module.css";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { clsx } from "clsx";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { selectIsLoading } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";

export const SharedLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const location = useLocation();
	const isLoading = useSelector(selectIsLoading);

	const getPageTitle = () => {
		const path = location.pathname;

		if (path.includes("/dashboard")) return "Dashboard";
		if (path.includes("/products")) return "All products";
		if (path.includes("/orders")) return "All orders";
		if (path.includes("/suppliers")) return "All suppliers";
		if (path.includes("/customers")) return "All customers";

		return "Dashboard";
	};

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	return (
		<div className={clsx(css.wrapper, "container")}>
			<Header toggleSidebar={toggleSidebar} pageTitle={getPageTitle()} />
			<div className={css.contentWrapper}>
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<div className={css.content}>
					<Outlet />
				</div>
			</div>

			{isLoading && <Loader />}
		</div>
	);
};
