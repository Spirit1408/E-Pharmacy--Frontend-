import css from "./LogoutBtn.module.css";
import sprite from "/sprite.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";

export const LogoutBtn = () => {
    const dispatch = useDispatch();

    return (
        <button
            className={css.logout}
            type="button"
            onClick={() => dispatch(logout())}>
            <svg className={css.icon}>
                <use href={`${sprite}#icon-exit`} />
            </svg>
        </button>
    );
};
