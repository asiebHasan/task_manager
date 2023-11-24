import axios from "axios";
import {
    fetchTasksRequest,
    fetchTasksSuccess,
    fetchTasksFailure,
} from "../actions/tasks";
import authHeader from "./auth-header";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth/tasks/";

export const fetchTasks = () => {
    return (dispatch) => {
        dispatch(fetchTasksRequest());
        axios
            .get(API_BASE_URL, { headers: authHeader() })
            .then((response) => {
                dispatch(fetchTasksSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchTasksFailure(error.message));
            });
    };
};
