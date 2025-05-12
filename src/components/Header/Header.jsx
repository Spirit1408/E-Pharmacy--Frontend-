import css from "./Header.module.css";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import { Link } from "react-router-dom";
import sprite from "/sprite.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import clsx from "clsx";

export const Header = ({ toggleSidebar, pageTitle = "Dashboard" }) => {
    const {email} = useSelector(selectUser);

    return (
        <header className={css.wrapper}>
            <div className={css.logoOverlay}>
                <button
                    type="button"
                    className={css.menuBtn}
                    onClick={toggleSidebar}>
                    <svg className={css.icon}>
                        <use href={`${sprite}#icon-burguer`} />
                    </svg>
                </button>

                <Link
                    to="/dashboard"
                    className={css.logoLink}>
                    <picture>
                        <source srcSet="/logo.png 1x, /logo@2x.png 2x" />
                        <img
                            src="/logo.png"
                            alt="logo icon"
                            className={css.logo}
                        />
                    </picture>
                </Link>

                <div className={css.headerMain}>
                    <h2 className={css.title}>Medicine store</h2>

                    <div className={css.links}>
                        <p className={css.link}>{pageTitle}</p>
                        <p className={clsx(css.link, css.email)}>{email}</p>
                    </div>
                </div>
            </div>

            <div className={css.logoutWrapper}>
                <LogoutBtn />
            </div>
        </header>
    );
};
