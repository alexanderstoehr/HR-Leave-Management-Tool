import axios from "axios";

const local = "http://127.0.0.1:8000/";
const remote = "https://hr-genie-backend-24b07ef76680.herokuapp.com"


const api = axios.create({
    baseURL: local
});


api.setAuthToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export {api};