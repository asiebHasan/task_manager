import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

const register = (username, email, password, confirm_password) => {
    console.log(username, email, password, confirm_password);
    return axios.post(API_URL + "register/", {
        username,
        email,
        password,
        confirm_password,
    });
};

const login = async (username, password) => {
    return axios
        .post(API_URL + "login/", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
