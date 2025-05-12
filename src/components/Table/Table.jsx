import css from './Table.module.css'
import { useSelector } from 'react-redux'

export const Table = () => {
    const { latestCustomers } = useSelector(state => state.dashboard)
    
    return <div className={css.tableContainer}>
    <div className={css.caption}>Recent customers</div>
    <div className={css.tableWrapper}>
        <table className={css.table}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Spent</th>
            </tr>
        </thead>
        <tbody>
            {latestCustomers.map((customer, index) => (
                <tr key={index}>
                    <td><img src={customer.image} alt="customer" />{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.spent}</td>
                </tr>
            ))}
        </tbody>
    </table></div></div>
}