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
        return org.name.toLowerCase().includes(this.state.searchTerm)
      })
      console.log(orgs)
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

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs,
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs,
    users: globalState.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)