import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
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

  filterOrgsArray = () => {
    let orgs = [...this.props.orgs]
    if (this.props.searchTerm === "") {
      return orgs
    } else {
      orgs = this.props.orgs.filter((org) => {
        return org.name.toLowerCase().includes(this.props.searchTerm)
      })
    }
    return orgs
  }

  render () {
    console.log(this.props.searchTerm)
    return (
      <div className="App">
        <h1>Welcome to the Black Liberation Hub</h1>
        <FilterOrgs/>
        <OrganizationContainer orgs={this.filterOrgsArray()}/>
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

let setSearchTerm = (searchTerm) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: searchTerm
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
    searchTerm: globalState.searchTerm,
    users: globalState.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)