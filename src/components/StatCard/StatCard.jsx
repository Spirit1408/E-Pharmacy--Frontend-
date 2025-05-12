import css from './StatCard.module.css'
import sprite from '/sprite.svg'

const vocab = {
    'prod': ['All products', 'icon-total'],
    'sup': ['All suppliers', 'icon-total'],
    'cust': ['All customers', 'icon-users_dash']
}

export const StatCard = ({ title, value }) => {
    return <div className={css.wrapper}>
        <div className={css.headGroup}><svg className={css.icon}>
            <use href={`${sprite}#${vocab[title][1]}`} />
        </svg>

        <p className={css.title}>{vocab[title][0]}</p></div>
        <p className={css.value}>{value}</p>
    </div>;
}