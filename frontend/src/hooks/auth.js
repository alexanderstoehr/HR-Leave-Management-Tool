import {useDispatch, useSelector} from 'react-redux'
import {api} from '../common/api'
import {login, logout} from '../store/slices/UserSlice.jsx'

export default function useAuth() {

    const signInURL = '/auth/token/' //POST
    const signUpURL = '/auth/registration/' //POST
    const verificationURL = '/auth/registration/validation/' //PATCH
    const fetchUserInfosURL = '/users/me/' //GET
    const verifyTokenURL = '/auth/token/verify/' //POST

    const storeToken = useSelector((state) => state.user.accessToken)

    const dispatch = useDispatch()

    const SignInUser = async (email_input, password_input) => {
        try {
            const response = await api.post(signInURL, {
                    email: email_input,
                    password: password_input
                }
            )
            localStorage.setItem("accessToken", response.data.access)
            dispatch(login(response.data.access))
        } catch (error) {
            Logout()
        }
    }

    const SignUpUser = async (emailInput) => {
        try {
            const response = await api.post(signUpURL, {email: emailInput})
        } catch (error) {
            console.log(error);
        }
    }

    const VerifyUser = async (email_input, username_input, code_input, password_input, password_repeat_input, first_name_input, last_name_input) => {
        try {
            const response = await api.patch(verificationURL,
                {
                    email: email_input,
                    username: username_input,
                    code: code_input,
                    password: password_input,
                    password_repeat: password_repeat_input,
                    first_name: first_name_input,
                    last_name: last_name_input
                })

        } catch (error) {
            console.error(error);
        }
    }


    const Logout = () => {
        dispatch(logout())
        localStorage.removeItem("accessToken")
    }

    const fetchUserInfos = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${storeToken}`
            }
        }

        try {
            const response = await api.get(fetchUserInfosURL, config)
            console.log("Fetch User Infos Successful");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const verifyToken = async (localToken) => {
        try {
            const response = await api.post(verifyTokenURL, {token: localToken})
            console.log('response', response);
        } catch (error) {
            console.error('Error with token verification', error)
        }
    }

    return {
        SignInUser,
        SignUpUser,
        VerifyUser,
        Logout,
        fetchUserInfos,
        verifyToken
    }
}