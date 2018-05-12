// --- Library code ---
// As the library code will live in a central location it will not have access to reducer functions, so we must pass those as an attribute to createStore so we can reference it in our dispatch function

function createStore(reducer) {
    // The store should have four parts
    // The state
    // Get the state
    // Listen to changes in the state
    // Update the state

    let state;
    // Array of functions setup by the user that we will call every time we update the state
    let listeners = [];

    const getState = () => {
        return state
    };

    // subscribe returns a function that the user can use to remove/unsubscribe the listener
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) =>  l !== listener);
        }

    };

    const dispatch = (action) => {
        state = reducer(state,action);
        listeners.forEach((listener) => listener());
    };

    // Returning an object
    return {
        getState,
        subscribe,
        dispatch
    };
}



// --- App Code ---

// state = [] is an ES6 notation which check if the state is defined, and if it's not then it initiates it as an empty array
// todos is called a reducer functions, which must be a pure function
function todos(state = [],action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}






// --- Test ---
const store = createStore(todos);
console.log(createStore());
store.subscribe(() => {
    console.log('The new state of the store is: ', store.getStore);
});
const unsubscribe = store.subscribe(() => {
   console.log('The store changed');
});
