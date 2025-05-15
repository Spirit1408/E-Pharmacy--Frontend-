import clsx from "clsx";
import css from "./LoginPage.module.css";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { selectIsLoading, selectError } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-toastify";

export default function LoginPage() {
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	return (
		<div className={clsx(css.wrapper, "container")}>
			{isLoading && <Loader />}

			{error && toast.error(error)}

			<div>
				<div className={css.logoWrapper}>
					<picture>
						<source srcSet="/logo_login.png 1x, /logo_login@2x.png 2x" />
						<img src="/logo_login.png" alt="logo icon" className={css.logo} />
					</picture>

					<p className={css.logoText}>E-Pharmacy</p>
				</div>

				<h1 className={css.title}>
					Your medication, delivered Say goodbye to all{" "}
					<span>your healthcare </span>
					worries with us
				</h1>
			</div>

			{!isLoading && !error && <LoginForm />}
		</div>
	);
}
