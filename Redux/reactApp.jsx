function List(props) {
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>
                    <span
                        onClick={()=> {props.toggle && props.toggle(item.id)}} // && operator acts as a simple if statement which is checking is toggle is defined and if it is than it will assign the call to it
                        style={{textDecoration: item.complete ? 'line-through' : 'none'}}
                    >
                        {item.name}
                    </span>
                    <button onClick={() => props.remove(item)}>X</button>
                </li>
            ))}
        </ul>
    )
}

class ToDos extends React.Component {

    // Returning the to-do object for the action from the API response
    // Not using optimistic updates here
    addItem = (e) => {
        e.preventDefault();

        this.props.dispatch(handleAddTodo(
            this.input.value,
            () => this.input.value = '' // Passing a function that will contain the reference to be able to reset the input field
        ));

        // --  Moved code to handleAddTodo action creator that using thunk to handle data and API calls
        // API.saveTodo(this.input.value)
        //     .then((todo) => {
        //         this.props.store.dispatch(addTodoAction(todo))
        //         this.input.value = ''
        //     })
        //     .catch(() => alert('Please try again'));

        // const name = this.input.value;
        // this.input.value = '';
        //
        // this.props.store.dispatch(addTodoAction({
        //     name: name,
        //     id: generateId(),
        //     complete: false
        // }))
    };
    // Optimistic Updates: Updating the UI first to give feedback and then checking the API response in case of error
    // Separating data handling and UI by moving API calls to middleware (Thunk)
    removeItem = (todo) => {
        this.props.dispatch(handleRemoveTodo(todo));
    };

    toggleItem = (id) => {
        this.props.dispatch(handleToggleTodo(id));
    };

    render() {
        return (
            <div>
                <h1>TODOS</h1>
                <input
                    type='text'
                    placeholder='Add Todo'
                    ref={(input) => this.input = input}
                />
                <button onClick={this.addItem}>Add Todo</button>
                <List
                    items={this.props.todos}
                    remove={this.removeItem}
                    toggle={this.toggleItem}
                />
            </div>
        )
    }
}

const ConnectedToDos = connect((state) => ({todos: state.todos}))(ToDos);

// class ConnectedToDos extends React.Component {
//     render() {
//         return (
//             <Context.Consumer>
//                 {(store) => {
//                     const {todos} = store.getState()
//
//                     return <ToDos todos={todos} dispatch={store.dispatch}/>
//                 }}
//             </Context.Consumer>
//         )
//     }
// }


class Goals extends React.Component {
    addItem = (e) => {
        e.preventDefault();

        this.props.dispatch(handleAddGoal(
           this.input.value,
            () => this.input.value = ''
        ));

        // --- Moved to action creator handleAddGoal
        // API.saveGoal(this.input.value)
        //     .then((goal) => {
        //         this.props.store.dispatch(addGoalAction(goal))
        //         this.input.value = ''
        //     })
        //     .catch(() => alert('Please try again'));
        //
        // // const name = this.input.value;
        // this.input.value = '';
        //
        // this.props.store.dispatch(addGoalAction({
        //     name: name,
        //     id: generateId()
        // }))
    };

    removeItem = (goal) => {
        this.props.dispatch(handleRemoveGoal(goal));
    };

    render() {
        return (
            <div>
                <h1>GOALS</h1>
                <input
                    type='text'
                    placeholder='Add Goal'
                    ref={(input) => this.input = input}
                />
                <button onClick={this.addItem}>Add Goal</button>

                <List
                    items={this.props.goals}
                    remove={this.removeItem}
                />
            </div>
        )
    }
}

// See below ConnectedApp for reasoning
const ConnectedGoals = connect((state) => ({goals: state.goals}))(Goals);


// class ConnectedGoals extends React.Component {
//     render () {
//         return (
//             <Context.Consumer>
//                 {(store) => {
//                     const {goals} = store.getState();
//
//                     return <Goals goals={goals} dispatch={store.dispatch}/>
//                 }}
//             </Context.Consumer>
//         )
//     }
// }


class App extends React.Component {
    componentDidMount() {
        store.dispatch(handleInitialData());
    }

    render() {
        if (this.props.loading === true) {
            return (
                <h3>Loading . . .</h3>
            )
        }
        return (
            <div>
                <ConnectedToDos />
                <ConnectedGoals />
            </div>
        )
    }
}

//  v1
// A connected component is connected to the Redux store and is responsible for getting data from the store.
// A presentational component should not access the store. It should receive any information it needs as props and then just render a UI.
// We break down the components into a connected component and a presentational component to separate out the data and UI aspects.
// We use Context to get the store etc data to the connected component and pass it down to the presentational component as Props

// v2
// We will replace the ConnectedApp component with a more generic function that takes in
// 1. Props that we need to pass
// 2. The Component that we need to render and pass it those props
// This generic function will in turn create a ConnectComponent type component for us and pass the props to the presentational (UI) component for us
//
// class ConnectedApp extends React.Component {
//     render() {
//         return (
//             <Context.Consumer>
//                 {(store) => (
//                     <App store={store}/>
//                 )}
//             </Context.Consumer>
//         )
//     }
// }

// The connect function is a function that return a function that is again called with the next set of arguments, this second calling takes in the Component that needs to be rendered
// It basically builds us the Connected type component that we need
const ConnectedApp = connect((state) => ({loading: state.loading}))(App);


// mapStateToProps is the function that we pass to 'connect' that takes in the state and returns an object with the props that we want to pass our presentational component
function connect(mapStateToProps) {
    // connect should return a function that takes in a component that is then passed the props and which then returns the a ConnectedComponent type component which encompasses the presentational (UI) component
    // So basically we are creating a function that produces specific components of the type ConnectedComponents and does the work of passing the props and Context for us
    return (Component) => {

        class Receiver extends React.Component {
            componentDidMount () {
                const {subscribe} = this.props.store;

                this.unsubscribe = subscribe(() => {
                    this.forceUpdate()
                })
            }

            componentWillUnmount () {
                this.unsubscribe()
            }

            render() {
                const {dispatch, getState} = this.props.store; // We can do this as the ConnectComponent uses Context to pass store as a prop
                const state = getState();
                const stateNeeded = mapStateToProps(state); // This will give us the props that we need to pass
                return (
                    <Component {...stateNeeded} dispatch={dispatch}/>
                )
            }
        }

        class ConnectedComponent extends React.Component {
            render () {
                return (
                    <Context.Consumer>
                        {(store) => <Receiver store={store} />}
                    </Context.Consumer>
                )
            }
        }

        return ConnectedComponent
    }
}




const Context = React.createContext();

class Provider extends React.Component {
    render () {
        return (
            <Context.Provider value={this.props.store}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app')
);