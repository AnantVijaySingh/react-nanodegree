import React from 'react';
import {connect} from 'react-redux'; // Import connect from ReactRedux
import List from './List';
import {handleAddTodo, handleRemoveTodo, handleToggleTodo} from "../actions/todos";

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

export default ConnectedToDos