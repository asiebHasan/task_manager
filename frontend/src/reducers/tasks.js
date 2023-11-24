import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
} from "../constants/tasks";

const initialState = {
    task: [],
    loading: false,
    error: null,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: null,
            };
        case FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default tasksReducer;
