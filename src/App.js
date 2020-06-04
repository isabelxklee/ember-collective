import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {Route, Switch, Link, NavLink} from 'react-router-dom'
import OrganizationContainer from './OrganizationContainer.jsx'
import FilterOrgs from './FilterOrgs.jsx'

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrgs(orgs)
    })
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
  }

  render () {
    return (
      <div className="App">
        <h1>Welcome to the Black Liberation Hub</h1>
        <FilterOrgs/>
        <OrganizationContainer/>
      </div>
    )  
  }
}

let setAllOrgs = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let setSearchTerm = (search_term) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: search_term
  }
}

let setAllUsers = (users) => {
  return {
    type: "SET_ALL_USERS",
    payload: users
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs,
  setSearchTerm: setSearchTerm,
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs,
    search_term: globalState.search_term,
    users: globalState.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)