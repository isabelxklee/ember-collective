import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let initialState = {
  orgs: [
   {
     id: 1,
     name: "Minnesota Freedom Fund",
     website: "www.google.com"
   },
   {
     id: 2,
     name: "Bed-Stuy Strong",
     website: "www.google.com"
   }
  ]
}

let reducer = (state = initialState, action) => {
  switch(action.type) {
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

console.log(store.getState())