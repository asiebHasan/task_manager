import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
} from "../constants/tasks";

export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
});
