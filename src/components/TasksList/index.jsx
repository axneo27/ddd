import store from "../TasksReducer";

import { useEffect, useState } from 'react';
import {Col, ListGroup, Alert, Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksList', serializedState);
    } catch (e) {
        console.error("Could not save state to local storage", e);
    }
};

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('tasksList');
        if (serializedState === null) {
        return undefined;
        }
        console.log(serializedState);
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state from local storage", e);
        return undefined;
    }
};

const TasksList = () => {
    const [tasksList, setTasksList] = useState([]);
    const [shownType, setShownType] = useState(1); // 1: All, 2: Done, 3: Pending

    useEffect(() => {
        const loadedState = loadStateFromLocalStorage();
        if (loadedState) {
            store.dispatch({ type: 'SET_INITIAL_STATE', payload: loadedState });
            setTasksList(loadedState.tasksList);
        }

        const unsubscribe = store.subscribe(() => {
            setTasksList(store.getState().tasksList);
            saveStateToLocalStorage(store.getState());
        });
        
        return () => unsubscribe();
    }, []);

    const handleCheckChange = (id) => {
        store.dispatch({ type: 'CHANGE_IS_DONE', payload: id });
        saveStateToLocalStorage(store.getState());
    }

    return (
        <div>
            <div className="text-center mb-3">
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-1" value={1} checked={true} onChange={(e) => setShownType(e.currentTarget.value)}>
                        All
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2} onChange={(e) => setShownType(e.currentTarget.value)}>
                        Done
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={3} onChange={(e) => setShownType(e.currentTarget.value)}>
                        Pending
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Col xs={12} md={10} lg={8} style={{ maxHeight: '400px', overflowY: 'auto', margin: 'auto' }}>
                {tasksList.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No tasks found
                    </Alert>
                ) : (
                    <ListGroup>
                        {tasksList.map(task => (
                            (shownType == 1 || (shownType == 2 && task.done) || (shownType == 3 && !task.done)) && 
                            <ListGroup.Item key={task.id} style={{ width: '335px', margin: 'auto', marginTop: '20px' }}>
                                <Card style={{ width: '300px' }}>
                                    <Card.Body>
                                        <Card.Title className={`mb-1 ${task.done ? 'text-muted text-decoration-line-through' : ''}`}>
                                            {task.name}
                                        </Card.Title>
                                        <Badge pill bg={task.done ? "success" : "warning"} className="ms-2">
                                            {task.done ? "Completed" : "Pending"}
                                        </Badge>
                                        <Card.Text className="mt-2 mb-3">
                                            {task.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`task-${task.id}`}
                                                    checked={task.done}
                                                    onChange={() => handleCheckChange(task.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`task-${task.id}`}>
                                                    Mark as {task.done ? "Pending" : "Done"}
                                                </label>
                                            </div>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    store.dispatch({ type: 'REMOVE_TASK', payload: task.id });
                                                    saveStateToLocalStorage(store.getState());
                                                }}>
                                                <i className="bi bi-trash"></i> Remove
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
        </div>
    );
};

export default TasksList;