import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
	toast.success(message);
};

export const showErrorToast = (message) => {
	toast.error(message);
};

export const showInfoToast = (message) => {
	toast.info(message);
};

export const showWarningToast = (message) => {
	toast.warning(message);
};

export const authToasts = {
	loginSuccess: () => showSuccessToast("Login success"),
	loginError: (message) => showErrorToast(message || "Login error"),
	logoutSuccess: () => showInfoToast("Logout success"),
	logoutError: () => showErrorToast("Logout error"),
	sessionExpired: () => showWarningToast("Session expired"),
	unauthorized: () => showErrorToast("Unauthorized"),
	registerSuccess: () => showSuccessToast("Registration successful. You may log in using your credentials"),
	registerError: (message) => showErrorToast(message || "Registration error"),
};
