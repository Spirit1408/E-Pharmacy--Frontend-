import css from "./AddProductModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { useEffect } from "react";

const productSchema = yup.object({
	name: yup.string().required("Product name is required"),
	category: yup
		.string()
		.oneOf(
			["Medicine", "Heart", "Head", "Hand", "Leg", "Dental care", "Skin care"],
			"Invalid category",
		),
	suppliers: yup.string().required("Suppliers is required"),
	stock: yup
		.string()
		.matches(/^[0-9]*$/, "Stock must be a number")
		.required("Stock is required"),
	price: yup
		.string()
		.matches(/^[0-9.]*$/, "Price must be a number")
		.required("Price is required"),
});

export const AddProductModal = ({
	onSubmit,
	onCancel,
	initialData,
	isEdit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm({
		resolver: yupResolver(productSchema),
		defaultValues: initialData || {
			name: "",
			suppliers: "",
			category: "",
			stock: "",
			price: "",
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (initialData) {
			reset({
				name: initialData.name || "",
				suppliers: initialData.suppliers || "",
				category: initialData.category || "",
				stock: initialData.stock.toString() || "",
				price: initialData.price.toString() || "",
			});
		} else if (!isEdit) {
			reset({
				name: "",
				suppliers: "",
				category: "",
				stock: "",
				price: "",
			});
		}
	}, [initialData, reset, isEdit]);

	const categoryValue = watch("category");

	const onFormSubmit = (data) => {
		onSubmit?.(data);
		if (isEdit) {
			reset();
		}
	};

	const handleCategoryChange = (event) => {
		setValue("category", event.target.value, { shouldValidate: true });
	};

	const categoryOptions = [
		"Medicine",
		"Heart",
		"Head",
		"Hand",
		"Leg",
		"Dental care",
		"Skin care",
	];

	return (
		<>
			<h3>{isEdit ? "Edit product" : "Add a new product"}</h3>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className={css.inputs}>
					<div className={css.inputWrapper}>
						<input
							type="text"
							placeholder="Product info"
							{...register("name")}
						/>
						{errors.name && (
							<p className={css.errorText}>{errors.name.message}</p>
						)}
					</div>

					<div className={css.inputWrapper}>
						<CustomSelect
							options={categoryOptions}
							placeholder="Category"
							value={categoryValue}
							onChange={handleCategoryChange}
							name="category"
							error={errors.category?.message}
						/>
					</div>

					<div className={css.inputWrapper}>
						<input
							type="text"
							placeholder="Suppliers"
							{...register("suppliers")}
						/>
						{errors.suppliers && (
							<p className={css.errorText}>{errors.suppliers.message}</p>
						)}
					</div>

					<div className={css.inputWrapper}>
						<input type="text" placeholder="Stock" {...register("stock")} />
						{errors.stock && (
							<p className={css.errorText}>{errors.stock.message}</p>
						)}
					</div>

					<div className={css.inputWrapper}>
						<input type="text" placeholder="Price" {...register("price")} />
						{errors.price && (
							<p className={css.errorText}>{errors.price.message}</p>
						)}
					</div>
				</div>
				<div className={css.btns}>
					<button type="submit" className={css.addBtn} data-form>
						{isEdit ? "Save" : "Add"}
					</button>
					<button
						type="button"
						className={`${css.cancelBtn} ${css.deactive}`}
						onClick={onCancel}
						data-form
					>
						Cancel
					</button>
				</div>
			</form>
		</>
	);
};
