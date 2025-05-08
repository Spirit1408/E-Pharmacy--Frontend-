import css from "./LoginForm.module.css";
import * as yup from "yup";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import sprite from "/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectError, selectIsLoading } from "../../redux/auth/selectors";

const schema = yup.object({
	email: yup
		.string()
		.matches(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Invalid format",
		)
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, isValid },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = (data) => {
		dispatch(login(data));
		reset();
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<form className={css.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={css.inputs}>
				<div className={css.inputWrapper}>
					<input
						type="text"
						placeholder="Email address"
                        autoComplete="off"
						className={clsx({
							[css.green]: dirtyFields.email && !errors.email,
						})}
						{...register("email")}
					/>
					{errors.email && (
						<p className={css.errorText}>{errors.email.message}</p>
					)}
				</div>

				<div className={css.inputWrapper}>
					<div className={css.passwordField}>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className={clsx({
								[css.green]: dirtyFields.password && !errors.password,
							})}
							{...register("password")}
						/>
						<button
							type="button"
							className={css.togglePassword}
							onClick={togglePasswordVisibility}
						>
							<svg className={css.passIcon}>
								<use
									href={
										showPassword
											? `${sprite}#icon-eye`
											: `${sprite}#icon-eye-off`
									}
								/>
							</svg>
						</button>
					</div>
					{errors.password && (
						<p className={css.errorText}>{errors.password.message}</p>
					)}
				</div>
			</div>
			{error && <p className={css.errorText}>{error}</p>}
			<button 
				type="submit" 
				className={css.submitButton} 
				disabled={!isValid || isLoading}
			>
				{isLoading ? "Loading..." : "Log In"}
			</button>
		</form>
	);
};
