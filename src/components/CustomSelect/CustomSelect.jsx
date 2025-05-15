import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";
import sprite from "/sprite.svg";

export const CustomSelect = ({
	options,
	placeholder,
	value,
	onChange,
	name,
	error,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(value || "");
	const [showScrollbar, setShowScrollbar] = useState(false);
	const selectRef = useRef(null);
	const scrollbarRef = useRef(null);
	const optionsContainerRef = useRef(null);

	useEffect(() => {
		setSelectedOption(value || "");
	}, [value]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const optionsContainer = optionsContainerRef.current;
		const scrollbar = scrollbarRef.current;

		const checkScrollbarVisibility = () => {
			const needsScrollbar =
				optionsContainer.scrollHeight > optionsContainer.clientHeight;
			setShowScrollbar(needsScrollbar);
		};

		checkScrollbarVisibility();

		if (!showScrollbar) return;

		const thumb = scrollbar.querySelector(`.${css.scrollbarThumb}`);

		const updateScrollbarThumb = () => {
			const scrollRatio =
				optionsContainer.scrollTop /
				(optionsContainer.scrollHeight - optionsContainer.clientHeight);
			const thumbPosition =
				scrollRatio * (scrollbar.clientHeight - thumb.clientHeight);
			thumb.style.top = `${thumbPosition}px`;
		};

		optionsContainer.addEventListener("scroll", updateScrollbarThumb);

		let isDragging = false;
		let startY = 0;
		let startScrollDown = 0;

		const onThumbMouseDown = (e) => {
			isDragging = true;
			startY = e.clientY;
			startScrollDown = optionsContainer.scrollTop;
			document.body.style.userSelect = "none";
		};

		const onMouseMove = (e) => {
			if (!isDragging) return;
			const dy = e.clientY - startY;
			const scrollRatio = dy / (scrollbar.clientHeight - thumb.clientHeight);
			const scrollAmount =
				scrollRatio *
				(optionsContainer.scrollHeight - optionsContainer.clientHeight);
			optionsContainer.scrollTop = startScrollDown + scrollAmount;
		};

		const onMouseUp = () => {
			isDragging = false;
			document.body.style.userSelect = "";
		};

		if (thumb) {
			thumb.addEventListener("mousedown", onThumbMouseDown);
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);

			updateScrollbarThumb();
		}

		const handleResize = () => {
			checkScrollbarVisibility();
			if (showScrollbar) {
				updateScrollbarThumb();
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			optionsContainer.removeEventListener("scroll", updateScrollbarThumb);
			if (thumb) {
				thumb.removeEventListener("mousedown", onThumbMouseDown);
			}
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen, showScrollbar]);

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		onChange({ target: { name, value: option } });
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={css.selectContainer} ref={selectRef}>
			<div
				className={`${css.selectHeader} ${isOpen ? css.active : ""}`}
				onClick={toggleDropdown}
			>
				<span className={selectedOption ? css.selectedText : css.placeholder}>
					{selectedOption || placeholder}
				</span>
				<svg className={`${css.arrow} ${isOpen ? css.up : ""}`}>
					<use href={`${sprite}#icon-arrow-down`} />
				</svg>
			</div>

			{isOpen && (
				<div className={css.optionsWrapper}>
					<div className={css.optionsContainer} ref={optionsContainerRef}>
						{options.map((option, index) => (
							<div
								key={index}
								className={`${css.option} ${selectedOption === option ? css.selected : ""}`}
								onClick={() => handleOptionClick(option)}
							>
								{option}
							</div>
						))}
					</div>

					{showScrollbar && (
						<div className={css.customScrollbar} ref={scrollbarRef}>
							<div className={css.scrollbarThumb}></div>
						</div>
					)}
				</div>
			)}

			{error && <p className={css.errorText}>{error}</p>}
		</div>
	);
};
