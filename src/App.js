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

let mapDispatchToProps = {
  setAllOrgs: setAllOrgs,
  setSearchTerm: setSearchTerm
}

let mapStateToProps = (globalState) => {
  return {
    orgs: globalState.orgs,
    search_term: globalState.search_term
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)