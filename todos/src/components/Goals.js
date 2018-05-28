import React from 'react';
import {connect} from 'react-redux'; // Import connect from ReactRedux
import List from './List';
import {handleAddGoal, handleRemoveGoal} from "../actions/goals";


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

const ConnectedGoals = connect((state) => ({goals: state.goals}))(Goals);

export default ConnectedGoals

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