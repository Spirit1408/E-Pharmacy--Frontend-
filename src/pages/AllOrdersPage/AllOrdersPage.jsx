import css from "./AllOrdersPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/orders/operations";
import {
	selectOrders,
	selectIsLoading,
	selectError,
	selectCurrentPage,
	selectTotalPages,
	selectNameFilter,
} from "../../redux/orders/selectors";
import { setPage, setNameFilter } from "../../redux/orders/slice";
import { UniversalTable } from "../../components/UniversalTable/UniversalTable";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { Filter } from "../../components/Filter/Filter";

export default function AllOrdersPage() {
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const nameFilter = useSelector(selectNameFilter);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch, currentPage, nameFilter]);

	const handlePageChange = (page) => {
		dispatch(setPage(page));
	};

	const handleFilterSubmit = (data) => {
		dispatch(setNameFilter(data.searchQuery));
		dispatch(setPage(1));
		dispatch(getOrders());
	};

	return (
		<div className={css.wrapper}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div className={css.filterWrapper}>
				<Filter onSubmit={handleFilterSubmit} type="other" />
			</div>

			<UniversalTable
				type="order"
				data={orders}
				pagination={{
					currentPage,
					totalPages,
					onPageChange: handlePageChange,
				}}
			/>
		</div>
	);
}
