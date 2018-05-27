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

        API.saveTodo(this.input.value)
            .then((todo) => {
                this.props.store.dispatch(addTodoAction(todo))
            })
            .catch(() => alert('Please try again'));

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
        this.props.store.dispatch(toggleTodoAction(id));

        API.saveTodoToggle(id)
            .catch(() => {
                this.props.store.dispatch(toggleTodoAction(id));
                alert('Action failed.')
            })
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

        API.saveGoal(this.input.value)
            .then((goal) => {
                this.props.store.dispatch(addGoalAction(goal))
            })
            .catch(() => alert('Please try again'));

        // const name = this.input.value;
        // this.input.value = '';
        //
        // this.props.store.dispatch(addGoalAction({
        //     name: name,
        //     id: generateId()
        // }))
    };

    removeItem = (goal) => {
        this.props.store.dispatch(removeGoalAction(goal.id));

        API.deleteGoal(goal.id)
            .catch(() => {
                this.props.store.dispatch(addGoalAction(goal));
                alert('Action failed. Please try again.')
            })
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

        Promise.all([
            API.fetchTodos(),
            API.fetchGoals(),
        ]).then(([todos,goals]) => {
            store.dispatch(receiveDataAction(todos,goals))
        });


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
ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);