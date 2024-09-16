import {ErrorMessageStyled, LoginContainerStyled, LoginPageStyled} from "../styles/loginStyles.js";
import {BtnLogin} from "../styles/buttonStyles.js";
import {useState} from "react";
import {api} from "../common/api.js";
import {addMyRequests, addMyTrainings, login, setUserObject} from "../store/slices/UserSlice.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ChangeCompanyName} from "../store/slices/CompanySlice.jsx";
import {loadRequests, loadTrainings} from "../store/slices/RequestSlice.jsx";

export default function LoginRoute() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessageVisibility, setErrorMessageVisibility] = useState(false)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    let accessToken

    const fetchToken = async () => {
        try {
            const res = await api.post("/auth/token/", {email, password})
            localStorage.setItem("accessToken", res.data.access);
            accessToken = res.data.access;
            localStorage.setItem("selectedView", "employee");
            dispatch(login(res.data.access));
            navigate("/employee")
        } catch (error) {
            console.error("catched: ", error);
            setErrorMessageVisibility(true);
        }
    }

    const fetchCompanyName = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        api.get("/companies/me/", config).then((res) => {
            console.log("Fetch Company Name: ", res.data.companyName);
            dispatch(ChangeCompanyName(res.data.companyName))
        });
    }

    const fetchTeamRequests = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            let endpointForAbsences = "/absences/manager/myteam"
            api.get(endpointForAbsences, config).then((res) => {
                // console.log("FetchRequests Response: ", res.data);
                let requestData = res.data;
                dispatch(loadRequests(requestData));
            });
        } catch (error) {
            console.error("FetchRequests Error: ", error);
        }
    }

    const fetchTeamTrainings = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            let endpointForTrainings = "/trainings/manager/myteam";
            api.get(endpointForTrainings, config).then((res) => {
                // console.log("FetchTrainings Response: ", res.data);
                let trainingData = res.data;
                dispatch(loadTrainings(trainingData));
            });
        } catch (error) {
            console.error("FetchTrainings Error: ", error);
        }
    };

    const fetchMyRequests = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            let endpointForAbsences = "/absences/me/"
            api.get(endpointForAbsences, config).then((res) => {
                // console.log("FetchRequests Response: ", res.data);
                let requestData = res.data;
                dispatch(addMyRequests(requestData));
            });
        } catch (error) {
            console.error("FetchMyRequests Error: ", error);
        }
    }

    const fetchMyTrainings = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            let endpointForTrainings = "/trainings/me/";
            api.get(endpointForTrainings, config).then((res) => {
                // console.log("FetchTrainings Response: ", res.data);
                let trainingData = res.data;
                dispatch(addMyTrainings(trainingData));
            });
        } catch (error) {
            console.error("FetchMyTrainings Error: ", error);
        }
    };

    const fetchMyself = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            api("/users/me/", config)
                .then((res) => {
                    dispatch(setUserObject(res.data[0]));
                })
        } catch (error) {
            console.error("FetchMyself Error: ", error);
        }

    }

    const handleLoginSubmit = async (e) => {
        // console.log("email: ", email);
        // console.log("password: ", password);
        e.preventDefault();

        // console.log("e: ", e);
        await fetchToken()
        await fetchCompanyName()
        await fetchTeamRequests()
        await fetchTeamTrainings()
        await fetchMyRequests()
        await fetchMyTrainings()
        await fetchMyself()
    }


    return (
        <LoginPageStyled>
            <LoginContainerStyled>
                <img src="/genielogo.png"/>
                <h2>Welcome Back 😍</h2>
                <p>Boosting HR since 2024!</p>
                <form onSubmit={(e) => handleLoginSubmit(e)}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <BtnLogin type="submit">
                        Login
                    </BtnLogin>


                    <ErrorMessageStyled className={errorMessageVisibility ? "errorMessageVisible" : ""}>Username or password incorrect.
                        Please try again.</ErrorMessageStyled>


                </form>


            </LoginContainerStyled>
        </LoginPageStyled>
    )
}
