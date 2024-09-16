import {useDispatch, useSelector} from 'react-redux'
import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {api} from "../common/api.js";
import {login} from "../store/slices/UserSlice.jsx";

export default function ProtectedRoute({allowedRoles}) {

    const isLoggedIn = useSelector((state) => state.user.accessToken)
    const userRole = useSelector((state) => state.user.role)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // State to manage authentication checking status

    // console.log("role: ", userRole)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const localToken = localStorage.getItem("accessToken");
        if (localToken) {
            console.log("Token in storage");
            api.post("auth/token/verify/", {token: localToken})
                // .then(dispatch(login(localToken)))
                .then(res => {
                    if (res.status === 200) {
                        console.log("Token verified");
                        dispatch(login(localToken));
                    } else {
                        throw new Error('Token verification failed');
                    }
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    console.log("Token verification failed or wrong token");
                    navigate("/login");
                })
                .finally(() => setIsCheckingAuth(false)); // Set checking status to false after verification

        } else {
            console.log("No token in storage");
            navigate("/login");
            setIsCheckingAuth(false); // Set checking status to false if no token found

        }
    }, []);

    if (isCheckingAuth) {
        return <>⏳</>; // Or any other loading indicator
    }

    if (!isLoggedIn) {
        return <Navigate to='/login'/>;
    } else if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to='/employee'/>;
    }

    return <Outlet/>;


}
