import './assets/js/classList.polyfill.js' 
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import App from './clientApp';
import { AppContainer } from 'react-hot-loader'
require('smoothscroll-polyfill').polyfill(); //Only client does not work on server

// This value is rendered into the DOM by the server
const initialState = window.__INITIAL_STATE;

// Create store with the initial state generated by the server
const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())

//const store = createStore(reducers, initialState, reduxMiddleware);

// Create Redux store with initial state
const store = (module.hot && module.hot.data && module.hot.data.store)
  ? module.hot.data.store
  : createStore(
  reducers, initialState, reduxMiddleware
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
          <App />
    </AppContainer>
  </Provider>,
  document.getElementById('app')
)



if (module.hot) {
  module.hot.accept();

  module.hot.dispose((data) => {
    data.store = store;
  });
}

registerServiceWorker();
