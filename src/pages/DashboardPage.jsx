import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/operations";

export default function DashboardPage () {
    const dispatch = useDispatch();
    return <div>DashboardPage
        <button onClick={() => {dispatch(logout())}}>Logout</button>
    </div>;
}