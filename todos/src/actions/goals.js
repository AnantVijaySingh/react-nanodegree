import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoal (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoal (id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

export function handleAddGoal(goalName, callBackFunc) {
    return (dispatch) => {
        API.saveGoal(goalName)
            .then((goal) => {
                dispatch(addGoal(goal));
                callBackFunc()
            })
            .catch(() => alert('Please try again'));
    }
}

export function handleRemoveGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoal(goal.id));

        API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoal(goal));
                alert('Action failed. Please try again.')
            })
    }
}