import React from 'react';
import {connect} from 'react-redux'; // Import connect from ReactRedux
import ConnectedToDos from './ToDos.js';
import ConnectedGoals from './Goals.js';
import {handleInitialData} from "../actions/shared";


class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
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

const ConnectedApp = connect((state) => ({loading: state.loading}))(App);

export default ConnectedApp;


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
// const ConnectedApp = connect((state) => ({loading: state.loading}))(App);


// ----- mapStateToProps is the function that we pass to 'connect' that takes in the state and returns an object with the props that we want to pass our presentational component
// function connect(mapStateToProps) {
//     ----- connect should return a function that takes in a component that is then passed the props and which then returns the a ConnectedComponent type component which encompasses the presentational (UI) component
//     ----- So basically we are creating a function that produces specific components of the type ConnectedComponents and does the work of passing the props and Context for us
//     return (Component) => {
//
//         class Receiver extends React.Component {
//             componentDidMount () {
//                 const {subscribe} = this.props.store;
//
//                 this.unsubscribe = subscribe(() => {
//                     this.forceUpdate()
//                 })
//             }
//
//             componentWillUnmount () {
//                 this.unsubscribe()
//             }
//
//             render() {
//                 const {dispatch, getState} = this.props.store; // We can do this as the ConnectComponent uses Context to pass store as a prop
//                 const state = getState();
//                 const stateNeeded = mapStateToProps(state); // This will give us the props that we need to pass
//                 return (
//                     <Component {...stateNeeded} dispatch={dispatch}/>
//                 )
//             }
//         }
//
//         class ConnectedComponent extends React.Component {
//             render () {
//                 return (
//                     <Context.Consumer>
//                         {(store) => <Receiver store={store} />}
//                     </Context.Consumer>
//                 )
//             }
//         }
//
//         return ConnectedComponent
//     }
// }




// const Context = React.createContext();

// class Provider extends React.Component {
//     render () {
//         return (
//             <Context.Provider value={this.props.store}>
//                 {this.props.children}
//             </Context.Provider>
//         )
//     }
// }