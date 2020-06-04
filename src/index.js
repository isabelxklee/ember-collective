import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let initialState = {
  orgs: [],
  search_term: ""
}

let reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_ALL_ORGS":
      return {
        ...state,
        orgs: action.payload
      }
    case "SET_SEARCH_TERM":
    return {
      ...state,
      search_term: action.payload
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