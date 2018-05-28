import {ADD_TODO} from "../actions/todos";
import {ADD_GOAL} from "../actions/goals";


// --- Redux Middleware ---
// Next is either another middleware or the dispatch function
const checker = (store) => (next) => (action) => {
    if (
        action.type === ADD_TODO &&
        action.todo.name.toLocaleLowerCase().includes('bitcoin')
    ) {

        return alert("Nope, don't do that");
    }

    if (
        action.type === ADD_GOAL &&
        action.goal.name.toLocaleLowerCase().includes('bitcoin')
    ) {
        return alert("Nope, don't do that");
    }

    return next(action)
};

export default checker;



// --- Custom Redux middleware ---

// function checkAndDispatch(store, action) {
//     if (
//         action.type === ADD_TODO &&
//         action.todo.name.toLocaleLowerCase().includes('bitcoin')
//     ) {
//
//         return alert("Nope, don't do that");
//     }
//
//     if (
//         action.type === ADD_GOAL &&
//         action.goal.name.toLocaleLowerCase().includes('bitcoin')
//     ) {
//         return alert("Nope, don't do that");
//     }
//
//     return store.dispatch(action)
// }

