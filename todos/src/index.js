import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; // Provider from ReactRedux
import ConnectedApp from './components/App';
import reducer from './reducers'; // This was the reducer is linked to the index.js file in that directory
import middleware from './middleware'; // This was the middleware is linked to the index.js file in that directory
import {createStore} from 'redux';

const store = createStore(reducer,middleware);

// --- Default implementation looks like ---
// const store = Redux.createStore(
//     Redux.combineReducers({
//         todos,
//         goals,
//         loading}),
//     Redux.applyMiddleware(ReduxThunk.default, checker, logger)
// );

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);
