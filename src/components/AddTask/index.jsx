import store from "../TasksReducer";

import {useState} from 'react'

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksList', serializedState);
    } catch (e) {
        console.error("Could not save state to local storage", e);
    }
};

const ClearTasksListButton = () => {
    const clearTaskList = () => {
        store.dispatch({ type: 'CLEAR_TASK_LIST' });
        saveStateToLocalStorage(store.getState());
    };

    return (
        <button className="btn btn-outline-danger ms-2" onClick={clearTaskList}>
            Clear Task List
        </button>
    );
};

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const isDone = false;
    const [description, setDescription] = useState('');

    const addTask = () => {
        const newTask = { id: Date.now(), name: taskName, done: isDone, description: description };
        store.dispatch({ type: 'ADD_TASK', payload: newTask });
        setTaskName('');
        setDescription('');

        console.log(store.getState());
        saveStateToLocalStorage(store.getState());
    };

    return (
        <div className="container mt-4" style={{ width: '550px', margin: '20px' }}>
            <div className="row mb-3">
                <div className="col-md-5 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Task Title"
                    />
                </div>
                <div className="col-md-5 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                </div>
            </div>
            <div className="col-md-2 d-flex align-items-start" style={{ width: '100%' }}>
                    <button className="btn btn-primary me-2" onClick={addTask}>
                        Add Task
                    </button>
                    <ClearTasksListButton />
            </div>
        </div>
    );
};

export default AddTask;