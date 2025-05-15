import css from "./AllProductsPage.module.css";
import { Filter } from "../../components/Filter/Filter";
import { UniversalTable } from "../../components/UniversalTable/UniversalTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../../redux/products/operations";
import {
	selectProducts,
	selectIsLoading,
	selectCurrentPage,
	selectTotalPages,
	selectNameFilter,
	selectError,
} from "../../redux/products/selectors";
import { setNameFilter, setPage } from "../../redux/products/slice";
import { AddProductModal } from "../../components/AddProductModal/AddProductModal";
import { Modal } from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader/Loader";

export default function AllProductsPage() {
	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const isLoading = useSelector(selectIsLoading);
	const currentPage = useSelector(selectCurrentPage);
	const totalPages = useSelector(selectTotalPages);
	const nameFilter = useSelector(selectNameFilter);
	const error = useSelector(selectError);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch, currentPage, nameFilter]);

	const handleFilterSubmit = (data) => {
		dispatch(setNameFilter(data.searchQuery));
		dispatch(setPage(1));
		dispatch(getProducts());
	};

	const handlePageChange = (page) => {
		dispatch(setPage(page));
	};

	const handleAddProduct = (formData) => {
		const productData = {
			name: formData.name,
			category: formData.category,
			suppliers: formData.suppliers,
			stock: formData.stock,
			price: formData.price,
		};

		dispatch(addProduct(productData))
			.unwrap()
			.then(() => {
				setIsModalOpen(false);
				dispatch(getProducts());
				toast.success("Product added successfully");
			})
			.catch((error) => {
				toast.error(`Error adding product: ${error}`);
				setIsModalOpen(true);
			});
	};

	const handleEditProduct = (formData) => {
		if (!currentProduct || !currentProduct._id) {
			toast.error("Error: Product ID not found");
			return;
		}

		const productData = {
			name: formData.name,
			category: formData.category,
			suppliers: formData.suppliers,
			stock: formData.stock,
			price: formData.price,
		};

		dispatch(updateProduct({ productId: currentProduct._id, productData }))
			.unwrap()
			.then(() => {
				setIsModalOpen(false);
				setIsEditMode(false);
				setCurrentProduct(null);
				dispatch(getProducts());
				toast.success("Product updated successfully");
			})
			.catch((error) => {
				toast.error(`Error updating product: ${error}`);
			});
	};

	const handleDeleteProduct = (productId) => {
		if (!productId) {
			toast.error("Error: Product ID not found");
			return;
		}

		dispatch(deleteProduct(productId))
			.unwrap()
			.then(() => {
				dispatch(getProducts());
				toast.success("Product deleted successfully");
			})
			.catch((error) => {
				toast.error(`Error deleting product: ${error}`);
			});
	};

	const handleOpenModal = () => {
		setIsEditMode(false);
		setCurrentProduct(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (product) => {
		const productForEdit = {
			name: product.name || "",
			category: product.category || "",
			suppliers: product.suppliers || "",
			stock: product.stock?.toString() || "",
			price: product.price?.toString() || "",
			_id: product._id,
		};

		setCurrentProduct(productForEdit);
		setIsEditMode(true);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsEditMode(false);
		setCurrentProduct(null);
	};

	const handleFormSubmit = (formData) => {
		if (isEditMode) {
			handleEditProduct(formData);
		} else {
			handleAddProduct(formData);
		}
	};

	return (
		<div className={css.wrapper}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div className={css.filterWrapper}>
				<Filter type="prod" onSubmit={handleFilterSubmit} />

				<div className={css.newProductBtnWrapper}>
					<button className={css.newProductBtn} onClick={handleOpenModal}>
						+
					</button>

					<p className={css.newProductBtnText}>Add a new product</p>
				</div>
			</div>

			<UniversalTable
				type="prod"
				data={products}
				pagination={{
					currentPage,
					totalPages,
					onPageChange: handlePageChange,
				}}
				onEdit={handleOpenEditModal}
				onDelete={handleDeleteProduct}
			/>

			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<AddProductModal
					onSubmit={handleFormSubmit}
					onCancel={handleCloseModal}
					isEdit={isEditMode}
					initialData={currentProduct}
				/>
			</Modal>
		</div>
	);
}
