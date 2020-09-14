import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import ScrollToTop from './ScrollToTop.jsx'
import { usePromiseTracker } from "react-promise-tracker"

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker()
  return (
    promiseInProgress
  )
}

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
  receivers: [],
  senders: []
}

let initialNominationState = {
  nominations: []
}

let initialDonationState = {
  donation_challenges: []
}

let initialTagState = {
  tags: [],
  tag_joiners: []
}

let initialResources = {
  resources: []
}

let initialEvents = {
  events: []
}

let initialCategoryState = {
  categories: [],
  category_joiners: []
}

let initialLovedOneState = {
  loved_ones: []
}

let lovedOnesReducer = (state = initialLovedOneState, action) => {
  switch(action.type) {
    case "SET_ALL_LOVED_ONES":
      return {
        ...state,
        loved_ones: action.payload
      }
    default:
      return state
  }
}

let categoryReducer = (state = initialCategoryState, action) => {
  switch(action.type) {
    case "SET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      }
    case "SET_ALL_CATEGORY_JOINERS":
      return {
        ...state,
        category_joiners: action.payload
      }
    default:
      return state
  }
}

let eventReducer = (state = initialEvents, action) => {
  switch(action.type) {
    case "SET_ALL_EVENTS":
      return {
        ...state,
        events: action.payload
      }
    default:
      return state
  }
}

let resourceReducer = (state = initialResources, action) => {
  switch(action.type) {
    case "SET_ALL_RESOURCES":
      return {
        ...state,
        resources: action.payload
      }
    default:
      return state
  }
}

let tagReducer = (state = initialTagState, action) => {
  switch(action.type) {
    case "SET_ALL_TAGS":
      return {
        ...state,
        tags: action.payload
      }
    case "SET_ALL_TAG_JOINERS":
      return {
        ...state,
        tag_joiners: action.payload
      }
    case "CREATE_TAG_JOINER":
    return {
      ...state,
      tag_joiners: [...state.tag_joiners, action.payload]
    }
    default:
      return state
  }
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
    case "UPDATE_ORG":
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
      senders: action.payload.user.senders,
      token: action.payload.token
    }
    case "UPDATE_USER":
      return {
        ...state,
        users: [...state.users, action.payload]
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
  donationInformation: donationReducer,
  tagInfo: tagReducer,
  resourceInformation: resourceReducer,
  eventInformation: eventReducer,
  categoryInformation: categoryReducer,
  lovedOnes: lovedOnesReducer
}

let rootReducer = combineReducers(singleObject)

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>    
    <BrowserRouter>
        <ScrollToTop />
        <App />
        <LoadingIndicator/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)