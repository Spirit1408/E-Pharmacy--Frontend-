import css from "./AllCustomersPage.module.css";
import { Filter } from "../../components/Filter/Filter";
import { UniversalTable } from "../../components/UniversalTable/UniversalTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../redux/customers/operations";
import {
	selectCustomers,
	selectIsLoading,
	selectCurrentPage,
	selectTotalPages,
	selectNameFilter,
	selectError,
} from "../../redux/customers/selectors";
import { setNameFilter, setPage } from "../../redux/customers/slice";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-toastify";

export default function AllCustomersPage() {
	const dispatch = useDispatch();
	const customers = useSelector(selectCustomers);
	const isLoading = useSelector(selectIsLoading);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const nameFilter = useSelector(selectNameFilter);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch, currentPage, nameFilter]);

	const handleFilterSubmit = (data) => {
		dispatch(setNameFilter(data.searchQuery));
		dispatch(setPage(1));
		dispatch(getCustomers());
	};

	const handlePageChange = (page) => {
		dispatch(setPage(page));
		dispatch(getCustomers());
	};

	const paginationConfig = {
		currentPage,
		totalPages,
		onPageChange: handlePageChange,
	};

	return (
		<div className={css.wrapper}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div className={css.filterWrapper}>
				<Filter onSubmit={handleFilterSubmit} type="other" />
			</div>

			<UniversalTable
				type="cust"
				data={customers.map((customer) => ({
					...customer,
					photo: customer.photo || customer.image,
					registerDate: customer.register_date,
				}))}
				pagination={paginationConfig}
			/>
		</div>
	);
}
