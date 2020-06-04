import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import App from './App'
import OrganizationContainer from './OrganizationContainer.jsx'
import NavBar from './NavBar.jsx'
import CreateAccount from './CreateAccount.jsx'
import Login from './Login.jsx'

let initialState = {
  orgs: [],
  search_term: "",
  users: []
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
    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload
      }
    case "CREATE_USER":
    return {
      ...state,
      users: [...state.users, action.payload]
    }
    default:
      return state
  }
}

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar/>
      <Route exact path="/" component={App} />
      <Route path="/browse-the-hub">
        <OrganizationContainer/>
      </Route>
      <Route path="/create-account">
        <CreateAccount/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)