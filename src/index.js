import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

let initialOrgState = {
  orgs: []
}

let initialUserState = {
  users: [],
  id: 0,
  username: "",
  email_address: "",
  created_at: "",
  token: "",
  receivers: []
}

let initialNominationState = {
  nominations: []
}

let initialDonationState = {
  donation_challenges: []
}

let orgReducer = (state = initialOrgState, action) => {
  switch(action.type) {
    case "SET_ALL_ORGS":
      return {
        ...state,
        orgs: action.payload
      }
    case "CREATE_ORG":
    return {
      ...state,
      orgs: [...state.orgs, action.payload]
    }
    default:
      return state
  }
}

let userReducer = (state = initialUserState, action) => {
  switch(action.type) {
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
    case "SET_USER_INFO":
    return {
      ...state,
      id: action.payload.user.id,
      username: action.payload.user.username,
      email_address: action.payload.user.email_address,
      created_at: action.payload.user.created_at,
      receivers: action.payload.user.receivers,
      token: action.payload.token
    }
    default:
      return state
  }
}

let nominationReducer = (state = initialNominationState, action) => {
  switch(action.type) {
    case "SET_ALL_NOMINATIONS":
      return {
        ...state,
        nominations: action.payload
      }
    case "CREATE_NOMINATION":
    return {
      ...state,
      nominations: [...state.nominations, action.payload]
    }
    default:
      return state
  }
}

let donationReducer = (state = initialDonationState, action) => {
  switch(action.type) {
    case "SET_ALL_DONATIONS":
      return {
        ...state,
        donation_challenges: action.payload
      }
    case "CREATE_DONATION":
    return {
      ...state,
      donation_challenges: [...state.donation_challenges, action.payload]
    }
    default:
      return state
  }
}

let singleObject = {
  orgInformation: orgReducer,
  userInformation : userReducer,
  nominationInformation: nominationReducer,
  donationInformation: donationReducer
}

let rootReducer = combineReducers(singleObject)

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>    
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)