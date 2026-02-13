import {createStore} from 'redux'

const initialState = {
    tasksList: []
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasksList: [...state.tasksList, action.payload]
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasksList: state.tasksList.filter(task => task.id !== action.payload)
            };
        case 'CLEAR_TASK_LIST':
            return {
                ...state,
                tasksList: []
            };
        case 'SET_INITIAL_STATE':
            return {
                ...state,
                tasksList: action.payload.tasksList
            };
        case 'CHANGE_IS_DONE':
            return {
                ...state,
                tasksList: state.tasksList.map((task) => {
                    if (task.id === action.payload) {
                        return { ...task, done: !task.done };
                    }
                    return task; 
                })
            };
        default:
        return state;
    }
}
const store = createStore(tasksReducer);

export default store;