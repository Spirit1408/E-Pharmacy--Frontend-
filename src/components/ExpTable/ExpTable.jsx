import css from './ExpTable.module.css'
import { useSelector } from 'react-redux'
import { selectLatestExpenses } from '../../redux/dash/selectors'

export const ExpTable = () => {
    const latestExpenses = useSelector(selectLatestExpenses)
    
    return <div className={css.tableContainer}>
    <div className={css.caption}>Income/Expenses</div>
    <div className={css.tableWrapper}>
        <table className={css.table}>
        <thead>
            <tr>
                <th>Today</th>
            </tr>
        </thead>
        <tbody>
            {latestExpenses.map((item, index) => (
                <tr key={index}>
                    <td>
                        <div className={`${css.status} ${item.type === 'Income' ? css.income : item.type !== 'Error' ? css.expense : css.error}`}>
                            {item.type}
                        </div>
                    </td>
                    <td>{item.name}</td>
                    <td>
                        <p className={`${css.amount} ${item.type === 'Income' ? "" : item.type !== 'Error' ? css.negative : css.absent}`}>
                            {item.amount}
                        </p>
                    </td>
                </tr>
            ))}
            {latestExpenses.length === 0 && (
                <tr>
                    <td colSpan="3">No data</td>
                </tr>
            )}
        </tbody>
    </table></div></div>
}