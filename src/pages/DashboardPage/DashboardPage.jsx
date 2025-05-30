import css from "./DashboardPage.module.css";
import { StatCard } from "../../components/StatCard/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardData } from "../../redux/dash/operations";
import { UniversalTable } from "../../components/UniversalTable/UniversalTable";
import { ExpTable } from "../../components/ExpTable/ExpTable";
import { Loader } from "../../components/Loader/Loader";
import { selectIsLoading, selectError } from "../../redux/dash/selectors";
import { toast } from "react-toastify";

export default function DashboardPage() {
	const dispatch = useDispatch();
	const { totalProducts, totalSuppliers, totalCustomers, latestCustomers } =
		useSelector((state) => state.dashboard);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchDashboardData());
	}, [dispatch]);

	return (
		<div className={css.wrapper}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div className={css.statsWrapper}>
				<StatCard title="prod" value={totalProducts} />
				<StatCard title="sup" value={totalSuppliers} />
				<StatCard title="cust" value={totalCustomers} />
			</div>

			<div className={css.tablesWrapper}>
				<UniversalTable type="recentCust" data={latestCustomers} />
				<ExpTable />
			</div>
		</div>
	);
}
