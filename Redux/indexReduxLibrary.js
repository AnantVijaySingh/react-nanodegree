// --- App Code ---

// state = [] is an ES6 notation which check if the state is defined, and if it's not then it initiates it as an empty array
// todos is called a reducer functions, which must be a pure function
// replacing the string for action.type with constants to avoid typo errors

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';


// Actions functions that help define actions

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id: id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}


function todos(state = [],action) {
    switch (action.type) {
        case ADD_TODO :
            return state.concat([action.todo]);
        case REMOVE_TODO :
            return state.filter(todo => todo.id !== action.id);
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo : (
                Object.assign({}, todo, {complete : !todo.complete})
            ));
        default :
            return state
    }
}



function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL :
            return state.concat([action.goal]);
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id);
        default :
            return state
    }
}

// We can only pass one reducer function to the createStore function, so we will break down the state object into two and use a root reducer to combine the reducers for different parts of the state
// Now the state is an object with two keys which are arrays
// function app(state = {}, action) {
//     return {
//         todos: todos(state.todos,action),
//         goals: goals(state.goals,action)
//     }
// }

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}));

store.subscribe(() => {
    console.log('The new state is: ', store.getState());

    const {todos, goals} = store.getState();

    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';

    todos.forEach((todo) => addTodoToDom(todo));
    goals.forEach((goal) => addGoalToDom(goal));


});

// --- UI Functions ---
function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function addToDo() {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value = '';

    store.dispatch(addTodoAction({
        name: name,
        id: generateId()
    }))
}

function addGoal() {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value = '';

    store.dispatch(addGoalAction({
        name: name,
        id: generateId()
    }))
}

document.getElementById('todoBtn').addEventListener('click',addToDo);
document.getElementById('goalBtn').addEventListener('click',addGoal);

function createRemoveButton(onClick) {
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click',onClick);
    return removeBtn;
}

function addTodoToDom(todo) {
    const node = document.createElement('li');
    const name = document.createTextNode(todo.name);
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    });
    node.appendChild(name);

    node.style.textDecoration = todo.complete ? 'line-through' : 'none';
    node.addEventListener('click',() => {
        store.dispatch(toggleTodoAction(todo.id))
    });

    node.appendChild(removeBtn);

    document.getElementById('todos').appendChild(node);
}


function addGoalToDom(goal) {
    const node = document.createElement('li');
    const name = document.createTextNode(goal.name);
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeGoalAction(goal.id))
    });
    node.appendChild(name);
    node.appendChild(removeBtn);

    document.getElementById('goals').appendChild(node);
}