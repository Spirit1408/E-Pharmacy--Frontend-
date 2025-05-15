import css from "./Modal.module.css";
import sprite from "/sprite.svg";
import { useEffect, useState, useCallback } from "react";

export const Modal = ({ children, isOpen, onClose }) => {
	const [isVisible, setIsVisible] = useState(isOpen);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose && onClose();
		}, 300);
	}, [onClose]);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Escape") {
				handleClose();
			}
		},
		[handleClose],
	);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	useEffect(() => {
		setIsVisible(isOpen);
	}, [isOpen]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div
			className={`${css.modalOverlay} ${isVisible ? css.visible : css.hidden}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`${css.modal} ${isVisible ? css.visibleModal : css.hiddenModal}`}
			>
				<button type="button" className={css.closeBtn} onClick={handleClose}>
					<svg className={css.icon}>
						<use href={`${sprite}#icon-close`} />
					</svg>
				</button>
				{children}
			</div>
		</div>
	);
};
