import css from "./Filter.module.css";
import sprite from "/sprite.svg";
import { useForm } from "react-hook-form";

export const Filter = ({ onSubmit = () => {}, type = "other" }) => {
	const vocab = {
		prod: "Product Name",
		other: "User Name",
	};

	const { register, handleSubmit } = useForm({
		defaultValues: {
			searchQuery: "",
		},
	});

	const processSubmit = (data) => {
		onSubmit(data);
	};

	return (
		<form className={css.filter} onSubmit={handleSubmit(processSubmit)}>
			<input
				type="text"
				placeholder={vocab[type] || vocab["other"]}
				className={css.input}
				{...register("searchQuery")}
			/>

			<button type="submit" className={css.filterBtn}>
				<svg className={css.icon}>
					<use href={`${sprite}#icon-filter`} />
				</svg>
				Filter
			</button>
		</form>
	);
};
