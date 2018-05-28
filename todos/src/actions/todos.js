import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// Actions functions that help define actions

function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id: id
    }
}

function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

// Taking out data handling from UI components
// We can use this action creator with our middleware
export function handleRemoveTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodo(todo.id));

        API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodo(todo));
                alert('Action failed. Please try again')
            })
    }
}

export function handleAddTodo(todoName, callBackFunc) {
    return (dispatch) => {
        API.saveTodo(todoName)
            .then((todo) => {
                dispatch(addTodo(todo));
                callBackFunc()
            })
            .catch(() => alert('Please try again'));
    }
}

export function handleToggleTodo(id) {
    return (dispatch) => {
        dispatch(toggleTodo(id));

        API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodo(id));
                alert('Action failed.')
            })
    }
}