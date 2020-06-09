import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import OrganizationContainer from './OrganizationContainer.jsx'
import FilterOrgs from './FilterOrgs.jsx'

class App extends Component {
  state = {
    searchTerm: ""
  }

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

  handleLoginSubmit = (userInfo) => {
    // event.preventDefault()
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  handleResponse = (response) => {
    localStorage.token = response.token
    // this.props.setUserInfo
  }

  handleSearchTerm = (inputFromChild) => {
    this.setState({
      searchTerm: inputFromChild
    })
  }

  filterOrgsArray = () => {
    let orgs = [...this.props.orgs]
    if (this.state.searchTerm === "") {
      return orgs
    } else {
      orgs = this.props.orgs.filter((org) => {
        return Object.keys(org).some(key =>
          typeof org[key] === "string"
          && org[key] !== "description"
          ?
          org[key].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : null
        )
    })
  }
  return orgs
  }

  render () {
    console.log(this.state.searchTerm)
    return (
      <div className="App">
        <h1>Welcome to the Black Liberation Hub</h1>
        <FilterOrgs
          searchTerm={this.state.searchTerm}
          handleSearchTerm={this.handleSearchTerm}
        />
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

let setAllUsers = (users) => {
  return {
    type: "SET_ALL_USERS",
    payload: users
  }
}

let setUserInfo = (response) => {
  return {
    type: "SET_USER_INFO",
    payload: response
  }
}

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs,
  setAllUsers: setAllUsers,
  setUserInfo: setUserInfo
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs,
    users: globalState.users,
    // token: globalState.userInfo.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)