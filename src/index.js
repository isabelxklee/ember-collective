import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let initialState = {
  orgs: []
}

let reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_ALL_ORGS":
      return {
        ...state,
        orgs: action.payload
      }
    default:
      return state
  }
}

let store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)