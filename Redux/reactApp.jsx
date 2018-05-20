function List(prop) {
    return (
        <ul>
            <li>LIST</li>
        </ul>
    )
}

class ToDos extends React.Component {

    addItem = (e) => {
        e.preventDefault();
        const name = this.input.value;
        this.input.value = '';

        this.props.store.dispatch(addTodoAction({
            name: name,
            id: generateId(),
            complete: false
        }))
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
                <List/>
            </div>
        )
    }
}

class Goals extends React.Component {
    addItem = (e) => {
        e.preventDefault();
        const name = this.input.value;
        this.input.value = '';

        this.props.store.dispatch(addGoalAction({
            name: name,
            id: generateId()
        }))
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

                <List/>
            </div>
        )
    }
}


class App extends React.Component {
    componentDidMount() {
        const {store} = this.props;

        store.subscribe(() => this.forceUpdate())
    }

    render() {
        const {store} = this.props;
        const {todos,goals} = store.getState();
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