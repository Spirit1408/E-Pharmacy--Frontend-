import css from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={css.overlay}>
            <div className={css.loader} />
        </div>
    );
};
