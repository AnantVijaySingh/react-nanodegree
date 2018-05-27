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

        this.props.store.dispatch(handleAddTodo(
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
        this.props.store.dispatch(handleRemoveTodo(todo));
    };

    toggleItem = (id) => {
        this.props.store.dispatch(handleToggleTodo(id));
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

class Goals extends React.Component {
    addItem = (e) => {
        e.preventDefault();

        this.props.store.dispatch(handleAddGoal(
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
        this.props.store.dispatch(handleRemoveGoal(goal));
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


class App extends React.Component {
    componentDidMount() {
        const {store} = this.props;
        store.dispatch(handleInitialData());

        store.subscribe(() => this.forceUpdate())
    }

    render() {
        const {store} = this.props;
        const {todos,goals,loading} = store.getState();

        if (loading === true) {
            return (
                <h3>Loading . . .</h3>
            )
        }
        return (
            <div>
                <ToDos todos={todos} store={store}/>
                <Goals goals={goals} store={store}/>
            </div>
        )
    }
}


// A connected component is connected to the Redux store and is responsible for getting data from the store.
// A presentational component should not access the store. It should receive any information it needs as props and then just render a UI.
// We break down the components into a connected component and a presentational component to separate out the data and UI aspects.
// We use Context to get the store etc data to the connected component and pass it down to the presentational component as Props


class ConnectedApp extends React.Component {
    render() {
        return (
            <Context.Consumer>
                {(store) => (
                    <App store={store}/>
                )}
            </Context.Consumer>
        )
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
        <App />
    </Provider>,
    document.getElementById('app')
);