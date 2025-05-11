import css from "./Sidebar.module.css";
import clsx from "clsx";
import sprite from "/sprite.svg";
import { NavLink } from "react-router-dom";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			toggleSidebar();
		}
	};

	const getNavLinkClass = ({ isActive }) => 
		isActive ? clsx(css.link, css.activeLink) : css.link;

	return (
		<div className={clsx(css.sidebarOverlay, { [css.isOpen]: isOpen })} onClick={handleOverlayClick}>
			<aside className={css.wrapper}>
				<button 
					type="button" 
					className={css.closeButton}
					onClick={toggleSidebar}
				>
					<svg className={css.closeIcon}>
						<use href={`${sprite}#icon-close`} />
					</svg>
				</button>

				<nav>
					<ul className={css.navLinks}>
						<li>
							<NavLink to="/home" className={getNavLinkClass}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-dash`} />
								</svg>
							</NavLink>
						</li>
						<li>
							<NavLink to="/products" className={getNavLinkClass}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-bottle`} />
								</svg>
							</NavLink>
						</li>
						<li>
							<NavLink to="/orders" className={getNavLinkClass}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-cart`} />
								</svg>
							</NavLink>
						</li>
						<li>
							<NavLink to="/suppliers" className={getNavLinkClass}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-pharm`} />
								</svg>
							</NavLink>
						</li>
						<li>
							<NavLink to="/customers" className={getNavLinkClass}>
								<svg className={css.icon}>
									<use href={`${sprite}#icon-users`} />
								</svg>
							</NavLink>
						</li>
					</ul>
				</nav>

				<div className={css.logoutWrapper}>
					<LogoutBtn />
				</div>
			</aside>
		</div>
	);
};
