import {AccountMenuContainer} from "../styles/headerStyles.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout, setUserKPIs, setUserObject} from "../store/slices/UserSlice.jsx";
import {changeView} from "../store/slices/ViewSlice.jsx";
import {loadRequests, loadTrainings} from "../store/slices/RequestSlice.jsx";


export default function AccountMenu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("selectedView");
        localStorage.removeItem("userList");
        dispatch(logout());
        navigate("/login");
        dispatch(setUserObject([]));
        dispatch(setUserKPIs([]));
        dispatch(changeView("employee"));
        dispatch(loadRequests([]));
        dispatch(loadTrainings([]));
    }


    return (
        <AccountMenuContainer>
            <div onClick={() => handleLogoutClick()}>Logout</div>
        </AccountMenuContainer>
    );
}