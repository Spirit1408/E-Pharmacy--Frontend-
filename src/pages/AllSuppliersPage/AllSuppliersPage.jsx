import css from "./AllSuppliersPage.module.css";
import { Filter } from "../../components/Filter/Filter";
import { UniversalTable } from "../../components/UniversalTable/UniversalTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSuppliers,
	addSupplier,
	updateSupplier,
} from "../../redux/suppliers/operations";
import {
	selectSuppliers,
	selectIsLoading,
	selectCurrentPage,
	selectTotalPages,
	selectError,
} from "../../redux/suppliers/selectors";
import { setNameFilter, setPage } from "../../redux/suppliers/slice";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";
import { AddSupModal } from "../../components/AddSupModal/AddSupModal";
import { toast } from "react-toastify";

export default function AllSuppliersPage() {
	const dispatch = useDispatch();
	const suppliers = useSelector(selectSuppliers);
	const isLoading = useSelector(selectIsLoading);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const error = useSelector(selectError);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [currentSupplier, setCurrentSupplier] = useState(null);

	useEffect(() => {
		dispatch(getSuppliers());
	}, [dispatch, currentPage]);

	const handleFilterSubmit = (data) => {
		dispatch(setNameFilter(data.searchQuery));
		dispatch(setPage(1));
		dispatch(getSuppliers());
	};

	const handlePageChange = (page) => {
		dispatch(setPage(page));
	};

	const handleEditSupplier = (supplier) => {
		setCurrentSupplier(supplier);
		setEditModalOpen(true);
	};

	const handleAddSupplier = () => {
		setAddModalOpen(true);
	};

	const handleAddModalClose = () => {
		setAddModalOpen(false);
	};

	const handleAddModalSubmit = (data) => {
		const formattedData = {
			...data,
			date: formatDate(data.date),
		};

		dispatch(addSupplier(formattedData))
			.unwrap()
			.then(() => {
				setAddModalOpen(false);
				dispatch(getSuppliers());
				toast.success("Supplier added successfully");
			})
			.catch((error) => {
				toast.error(`Error while adding supplier: ${error}`);
			});
	};

	const handleEditModalClose = () => {
		setEditModalOpen(false);
		setCurrentSupplier(null);
	};

	const handleEditModalSubmit = (data) => {
		if (!currentSupplier || !currentSupplier._id) {
			toast.error("Error: Supplier ID not found");
			return;
		}

		const formattedData = {
			...data,
			date: formatDate(data.date),
		};

		dispatch(
			updateSupplier({
				supplierId: currentSupplier._id,
				supplierData: formattedData,
			}),
		)
			.unwrap()
			.then(() => {
				setEditModalOpen(false);
				setCurrentSupplier(null);
				dispatch(getSuppliers());
				toast.success("Supplier updated successfully");
			})
			.catch((error) => {
				toast.error(`Error while updating supplier: ${error}`);
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return "";

		const [year, month, day] = dateString
			.split("-")
			.map((part) => parseInt(part, 10));

		const date = new Date(Date.UTC(year, month - 1, day));

		const utcDay = date.getUTCDate();

		const monthName = date.toLocaleString("en-US", {
			month: "long",
			timeZone: "UTC",
		});

		const utcYear = date.getUTCFullYear();

		return `${monthName} ${utcDay}, ${utcYear}`;
	};

	const formattedSuppliers = suppliers.map((supplier) => ({
		_id: supplier._id,
		name: supplier.name,
		address: supplier.address,
		suppliers: supplier.suppliers,
		date: supplier.date,
		amount: supplier.amount,
		status: supplier.status,
	}));

	const tablePagination = {
		currentPage,
		totalPages,
		onPageChange: handlePageChange,
	};

	return (
		<div className={css.wrapper}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div className={css.filterWrapper}>
				<Filter type="sup" onSubmit={handleFilterSubmit} />

				<button
					type="button"
					className={css.addSupBtn}
					onClick={handleAddSupplier}
				>
					Add new suppliers
				</button>
			</div>

			<UniversalTable
				type="sup"
				data={formattedSuppliers}
				pagination={tablePagination}
				onEdit={handleEditSupplier}
			/>

			<Modal isOpen={addModalOpen} onClose={handleAddModalClose}>
				<AddSupModal
					onSubmit={handleAddModalSubmit}
					onCancel={handleAddModalClose}
					isEdit={false}
				/>
			</Modal>

			<Modal isOpen={editModalOpen} onClose={handleEditModalClose}>
				<AddSupModal
					onSubmit={handleEditModalSubmit}
					onCancel={handleEditModalClose}
					initialData={currentSupplier}
					isEdit={true}
				/>
			</Modal>
		</div>
	);
}
